import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import HotelEntity from "./hotel.entity";
import RoomEntity from "./room.entity";

@Entity('tblreservation')
export default class ReservationEntity extends BaseEntity {
    @ManyToOne(() => HotelEntity, (hotel) => hotel.reservations, { onDelete: 'CASCADE' })
    hotel: HotelEntity;

    @OneToOne(() => RoomEntity)
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;
}