import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import HotelEntity from "./hotel.entity";
import RoomEntity from "./room.entity";
import UserEntity from "./user.entity";

export type ReservationDto = {
    hotelId?: string;
    roomId?: string;
    roomCode?: string;
    userId?: string;
    from: Date;
    to: Date;
    id: string;
    status: ReservationStatus;
}

export enum ReservationStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED'
}

@Entity('tblreservation')
export default class ReservationEntity extends BaseEntity {
    @ManyToOne(() => HotelEntity, (hotel) => hotel.reservations, { onDelete: 'CASCADE' })
    hotel: HotelEntity;

    @ManyToOne(() => RoomEntity, (room) => room.reservation)
    room: RoomEntity;

    @Column({ name: 'from_date', type: 'date' })
    fromDate: Date;

    @Column({ name: 'to_date', type: 'date' })
    toDate: Date;

    @ManyToOne(() => UserEntity, (user) => user.reservations, { onDelete: 'CASCADE' })
    user: UserEntity;

    @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.ACTIVE })
    status: ReservationStatus;

    getDto(): ReservationDto {
        return {
            from: this.fromDate,
            to: this.toDate,
            hotelId: this.hotel?.id,
            roomId: this.room?.id,
            roomCode: this.room?.code,
            userId: this.user?.id,
            id: this.id,
            status: this.status,
        }
    }
}