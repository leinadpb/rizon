import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import HotelService from "./hotel.service";
import { AvailableRoomsPayload, ReserverHotelRoomPayload } from "./hotel.types";

@Controller('/hotel')
export default class HotelController {
    constructor(private hotelService: HotelService) { }

    @Get()
    async getAllHotels() {
        return await this.hotelService.getAllHotels();
    }

    @Post('/:hotelId/available-rooms')
    async availableRooms(@Param('hotelId') hotelId: string, @Body() payload: AvailableRoomsPayload) {
        return await this.hotelService.getAvailableRooms(hotelId, payload);
    }

    @Post('/:hotelId/reserve')
    async reserveRoom(@Param('hotelId') hotelId: string, @Body() payload: ReserverHotelRoomPayload) {
        return await this.hotelService.reserverHotelRoom(hotelId, payload.userId, payload);
    }
}