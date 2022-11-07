import { Controller, Get, Param } from "@nestjs/common";
import UserService from "./user.service";

@Controller('user')
export default class UserController {
    constructor(private userService: UserService) { }

    @Get('/:userId/reservations')
    async getReservations(@Param('userId') userId: string) {
        return await this.userService.getUserReservations(userId);
    }

    @Get('/:email')
    async getUserByEmail(@Param('email') email: string) {
        return await this.userService.getUserbyEmail(email);
    }
}