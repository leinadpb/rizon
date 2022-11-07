import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from "typeorm";
import { BaseEntity } from "./base.entity";
import HotelEntity from "./hotel.entity";
import ReservationEntity from "./reservation.entity";

export type RoomDto = {
    code: string;
    hotel: string | HotelEntity;
    hasReservation: boolean;
}

@Entity('tblroom')
@Unique(['code', 'hotel'])
export default class RoomEntity extends BaseEntity {
    @Column({ name: 'code' })
    code: string;

    @ManyToOne(() => HotelEntity, (hotel) => hotel.rooms)
    hotel: string | HotelEntity;

    @OneToMany(() => ReservationEntity, (reservation) => reservation.room)
    reservation: ReservationEntity;

    getDto(): RoomDto {
        return {
            code: this.code,
            hotel: this.hotel,
            hasReservation: !!this.reservation
        }
    }
}