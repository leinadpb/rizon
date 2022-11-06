import { IsDateString, IsString } from 'class-validator';

export class AvailableRoomsPayload {
    @IsDateString()
    from: Date;

    @IsDateString()
    to: Date;
}

export class ReserverHotelRoomPayload {
    @IsDateString()
    from: Date;

    @IsDateString()
    to: Date;

    @IsString()
    roomCode: string;

    @IsString()
    userId: string;
}