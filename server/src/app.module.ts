import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './db/ormconfig';
import HotelModule from './hotel/hotel.module';
import ReservationModule from './reservation/reservation.module';
import UserModule from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), HotelModule, UserModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
