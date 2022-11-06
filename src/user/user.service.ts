import { Injectable } from "@nestjs/common";
import ReservationEntity from "src/entities/reservation.entity";
import { EntityManager } from "typeorm";

@Injectable()
export default class UserService {
    constructor(private entityManager: EntityManager) { }

    async getUserReservations(userId: string) {
        const reservations = await this.entityManager.getRepository(ReservationEntity).find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: ['user', 'room', 'hotel']
        });

        return reservations.map(r => r.getDto())
    }
}