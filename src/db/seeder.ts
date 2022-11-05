import { Injectable } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Injectable()
export default class Seeder {
  constructor(private readonly seederService: SeederService) { }

  async seed() {
    await this.countries()
    await this.users();
    await this.hotels();
    await this.rooms();
  }

  async users() {
    const saved = await this.seederService.createUsers();
    console.log('savedUsers', saved);
  }

  async countries() {
    const saved = await this.seederService.createCountries();
    console.log('savedCountries', saved);
  }

  async hotels() {
    const saved = await this.seederService.createHotels();
    console.log('savedHotels', saved);
  }

  async rooms() {
    const saved = await this.seederService.createRooms();
    console.log('savedRooms', saved);
  }
}
