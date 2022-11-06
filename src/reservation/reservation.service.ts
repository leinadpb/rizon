import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import ReservationEntity, { ReservationStatus } from "src/entities/reservation.entity";
import RoomEntity from "src/entities/room.entity";
import { Brackets, EntityManager } from "typeorm";
import { ReservationModifyPayload } from "./reservation.types";

@Injectable()
export default class ReservationService {
    constructor(private entityManager: EntityManager) { }

    async getReservedRoomIds(hotelId: string, from: Date, to: Date): Promise<string[]> {
        const reservedQuery = this.entityManager.createQueryBuilder(ReservationEntity, 'r')
            .innerJoin(RoomEntity, 'room', 'r."roomId" = room.id')
            .where('r."hotelId" = :hotelId')
            .andWhere('r.status = :status')
            .andWhere(new Brackets(qb => {
                qb.where("r.to_date >= :from")
                    .andWhere("r.from_date <= :to")
                    .orWhere(new Brackets(qz => {
                        qz.where("r.to_date >= :from")
                            .andWhere("r.from_date <= :to")
                    }))
            }))
            .select('room.id', 'roomId');

        reservedQuery.setParameter('hotelId', hotelId)
        reservedQuery.setParameter('from', from);
        reservedQuery.setParameter('to', to);
        reservedQuery.setParameter('status', ReservationStatus.ACTIVE)

        const reservedRoomIds = await reservedQuery.getRawMany();

        return reservedRoomIds.map(r => r.roomId as string);
    }

    async modify(reservationId: string, userId: string, payload: ReservationModifyPayload) {
        const { from, to } = payload;
        const reservation = await this.entityManager.getRepository(ReservationEntity).findOne({
            where: {
                id: reservationId,
                user: {
                    id: userId
                }
            },
            relations: ['hotel', 'user', 'room']
        });

        if (!reservation) {
            throw new NotFoundException('Reservation was not found for user.')
        }

        if (reservation.fromDate === from && reservation.toDate === to) {
            return reservation.getDto();
        }

        const { hotel, room } = reservation;
        const reservedRoomIds = await this.getReservedRoomIds(hotel.id, from, to);
        const restrictedRoom = reservedRoomIds.find(roomId => roomId === room.id);
        if (!!restrictedRoom) {
            throw new BadRequestException('Selected reservation date overlap with another reservation.')
        }

        reservation.fromDate = from;
        reservation.toDate = to;

        await this.entityManager.save(reservation);

        return reservation.getDto();
    }

    async cancel(reservationId: string, userId: string) {
        const reservation = await this.entityManager.getRepository(ReservationEntity).findOne({
            where: {
                id: reservationId,
                user: {
                    id: userId
                }
            },
            relations: ['hotel', 'user', 'room']
        });

        if (!reservation) {
            throw new NotFoundException('Reservation was not found for user.')
        }

        reservation.status = ReservationStatus.CANCELLED;

        await this.entityManager.save(reservation);

        return reservation.getDto();
    }
}