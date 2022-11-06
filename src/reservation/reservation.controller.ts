import { Body, Controller, Delete, Param, Put, Query } from "@nestjs/common";
import ReservationService from "./reservation.service";
import { ReservationModifyPayload } from "./reservation.types";

@Controller('/reservation')
export default class ReservationController {
    constructor(private reservationService: ReservationService) { }

    @Put('/:reservationId')
    async editReservation(@Param('reservationId') reservationId: string, @Query('userId') userId: string, @Body() payload: ReservationModifyPayload) {
        return await this.reservationService.modify(reservationId, userId, payload);
    }

    @Delete('/:reservationId')
    async cancelReservation(@Param('reservationId') reservationId: string, @Query('userId') userId: string) {
        return await this.reservationService.cancel(reservationId, userId);
    }
}