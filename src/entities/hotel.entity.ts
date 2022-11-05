import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import ReservationEntity from "./reservation.entity";
import RoomEntity from "./room.entity";

export type HotelDto = {
    name: string;
    govId: string;
    countryCode: string;
    totalRooms?: number;
    totalReservations?: number;
}

@Entity('tblhotel')
export default class HotelEntity extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'gov_id', unique: true })
    gov_id: string;

    @Column({ name: 'country_code' })
    countryCode: string;

    @OneToMany(() => RoomEntity, (room: RoomEntity) => room.hotel)
    rooms: RoomEntity[];

    @OneToMany(() => ReservationEntity, (reservation: ReservationEntity) => reservation.hotel)
    reservations: ReservationEntity[];


    getDto(): HotelDto {
        return {
            name: this.name,
            govId: this.gov_id,
            countryCode: this.countryCode,
            totalRooms: this.rooms?.length ?? 0,
            totalReservations: this.reservations?.length ?? 0,
        }
    }
}