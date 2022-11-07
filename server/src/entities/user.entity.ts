import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import ReservationEntity from "./reservation.entity";

export type UserDto = {
    id?: string;
    email: string;
    fullname?: string
}

@Entity('tbluser')
export default class UserEntity extends BaseEntity {
    @Column({ name: 'full_name', nullable: true })
    fullname: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'password_hash', nullable: true })
    passwordHash?: string;

    @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
    reservations: ReservationEntity[];

    getDto = (): UserDto => {
        return {
            id: this.id,
            email: this.email,
        }
    }
}