import { Injectable } from "@nestjs/common";
import ReservationEntity from "../entities/reservation.entity";
import { EntityManager } from "typeorm";
import UserEntity from "entities/user.entity";

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

    async getUserbyEmail(email: string) {
        const user = await this.entityManager.getRepository(UserEntity).findOne({
            where: {
                email,
            },
        });

        return user.getDto();
    }
}