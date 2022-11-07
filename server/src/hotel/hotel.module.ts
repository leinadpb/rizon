import { Module } from "@nestjs/common";
import ReservationModule from "../reservation/reservation.module";
import HotelController from "./hotel.controller";
import HotelService from "./hotel.service";

@Module({
    controllers: [HotelController],
    providers: [HotelService],
    imports: [ReservationModule]
})
export default class HotelModule { };