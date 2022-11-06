import { BadRequestException, Injectable } from "@nestjs/common";
import HotelEntity from "src/entities/hotel.entity";
import ReservationEntity from "src/entities/reservation.entity";
import RoomEntity from "src/entities/room.entity";
import UserEntity from "src/entities/user.entity";
import { Between, Brackets, EntityManager, In, Not } from "typeorm";
import { AvailableRoomsPayload, ReserverHotelRoomPayload } from "./hotel.types";


@Injectable()
export default class HotelService {
    constructor(private entityManager: EntityManager) { }

    async getAllHotels() {
        return await this.entityManager.getRepository(HotelEntity).find();
    }

    async getReservedRoomIds(hotelId: string, from: Date, to: Date): Promise<string[]> {
        const reservedQuery = this.entityManager.createQueryBuilder(ReservationEntity, 'r')
            .innerJoin(RoomEntity, 'room', 'r."roomId" = room.id')
            .where('r."hotelId" = :hotelId')
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

        console.log('reservedQuery', reservedQuery.getSql())
        const reservedRoomIds = await reservedQuery.getRawMany();

        return reservedRoomIds.map(r => r.roomId as string);
    }

    async getAvailableRooms(hotelId: string, payload: AvailableRoomsPayload) {
        const { from, to } = payload;

        const restrictedRoomIds = await this.getReservedRoomIds(hotelId, from, to);

        return await this.entityManager.getRepository(RoomEntity).find({
            where: {
                hotel: {
                    id: hotelId
                },
                id: Not(In(restrictedRoomIds))
            }
        })
    }

    async reserverHotelRoom(hotelId: string, userId: string, payload: ReserverHotelRoomPayload) {
        const { roomCode, from, to } = payload;

        const room = await this.entityManager.getRepository(RoomEntity).findOne({
            where: {
                code: roomCode
            }
        });
        const hotel = await this.entityManager.getRepository(HotelEntity).findOne({
            where: {
                id: hotelId
            }
        });
        const user = await this.entityManager.getRepository(UserEntity).findOne({
            where: {
                id: userId
            }
        });

        if (!room || !hotel || !user) {
            throw new BadRequestException('Invalid user params. Some does not match with entities in our system.')
        }

        const restrictedRoomIds = await this.getReservedRoomIds(hotelId, from, to);
        const restrictedRoom = restrictedRoomIds.find(roomId => roomId === room.id)

        if (!!restrictedRoom) {
            throw new BadRequestException('A reservation already exists for this room from/to date in this hotel.')
        }

        const reservation = new ReservationEntity();
        reservation.hotel = hotel;
        reservation.room = room;
        reservation.user = user;
        reservation.fromDate = from;
        reservation.toDate = to;

        return await this.entityManager.save(reservation);
    }
}