import { IsDateString, IsString } from "class-validator";

export class ReservationModifyPayload {
    @IsDateString()
    from: Date;

    @IsDateString()
    to: Date;
}