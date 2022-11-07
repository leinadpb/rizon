import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import HotelService from "./hotel.service";
import { AvailableRoomsPayload, ReserverHotelRoomPayload } from "./hotel.types";

@Controller('/hotel')
export default class HotelController {
    constructor(private hotelService: HotelService) { }

    @Get()
    async getAllHotels() {
        return await this.hotelService.getAllHotels();
    }

    @Get('/:hotelId')
    async getSingleHotels(@Param('hotelId') hotelId: string) {
        return await this.hotelService.getSingleHotel(hotelId);
    }

    @Post('/:hotelId/available-rooms')
    async availableRooms(@Param('hotelId') hotelId: string, @Body() payload: AvailableRoomsPayload) {
        return await this.hotelService.getAvailableRooms(hotelId, payload);
    }

    @Post('/:hotelId/reserve')
    async reserveRoom(@Param('hotelId') hotelId: string, @Query('userId') userId: string, @Body() payload: ReserverHotelRoomPayload) {
        return await this.hotelService.reserverHotelRoom(hotelId, userId, payload);
    }
}