import { Injectable } from '@nestjs/common';
import CountryEntity, { CountryDto } from 'src/entities/country.entity';
import HotelEntity, { HotelDto } from 'src/entities/hotel.entity';
import RoomEntity from 'src/entities/room.entity';
import UserEntity, { UserDto } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';

const sampleUsers: UserDto[] = [
  {
    email: 'daniel.pena+1@gmail.com',
    fullname: 'Daniel Pena 1',
  },
  {
    email: 'daniel.pena+2@gmail.com',
    fullname: 'Daniel Pena 2',
  },
  {
    email: 'daniel.pena+3@gmail.com',
    fullname: 'Daniel Pena 3',
  }
];

const sampleCountries: CountryDto[] = [
  {
    name: 'United States',
    code: 'US'
  },
  {
    name: 'Dominican Republic',
    code: 'DR'
  },
  {
    name: 'Mexico',
    code: 'MX'
  }
];

const sampleHotels: HotelDto[] = [
  {
    name: 'Hotel 1',
    countryCode: 'US',
    govId: '123456789',
  },
  {
    name: 'Hotel 2',
    countryCode: 'MX',
    govId: '456789765',
  },
  {
    name: 'Hotel 3',
    countryCode: 'MX',
    govId: '234234876',
  },
  {
    name: 'Hotel 4',
    countryCode: 'DR',
    govId: '569807658',
  },
  {
    name: 'Hotel 5',
    countryCode: 'DR',
    govId: '989000567',
  },
  {
    name: 'Hotel 6',
    countryCode: 'DR',
    govId: '2340064771',
  },
];

@Injectable()
export class SeederService {
  constructor(
    private entityManager: EntityManager,
  ) { }

  /**
   * Seed all users.
   *
   * @function
   */
  async createUsers(): Promise<UserEntity[]> {
    const savedEntities: UserEntity[] = [];

    for (let i = 0; i < sampleUsers.length; i++) {
      const item = sampleUsers[i];

      let dbEntity = await this.entityManager.getRepository(UserEntity).findOne({
        where: {
          email: item.email
        }
      });

      if (!!dbEntity) {
        continue;
      }

      const entity = new UserEntity();
      entity.email = item.email;
      entity.fullname = item.fullname;
      dbEntity = await this.entityManager.save(entity);

      savedEntities.push(dbEntity);
    }

    return savedEntities;
  }

  /**
  * Seed all countries.
  *
  * @function
  */
  async createCountries(): Promise<CountryEntity[]> {
    const savedEntities: CountryEntity[] = [];

    for (let i = 0; i < sampleCountries.length; i++) {
      const item = sampleCountries[i];

      let dbEntity = await this.entityManager.getRepository(CountryEntity).findOne({
        where: {
          code: item.code
        }
      });

      if (!!dbEntity) {
        continue;
      }

      const entity = new CountryEntity();
      entity.code = item.code;
      entity.name = item.name;
      dbEntity = await this.entityManager.save(entity);

      savedEntities.push(dbEntity);
    }

    return savedEntities;
  }

  /**
  * Seed all hotels.
  *
  * @function
  */
  async createHotels(): Promise<HotelEntity[]> {
    const savedEntities: HotelEntity[] = [];

    for (let i = 0; i < sampleHotels.length; i++) {
      const item = sampleHotels[i];

      const country = await this.entityManager.getRepository(CountryEntity).findOne({
        where: {
          code: item.countryCode
        }
      });

      if (!country) {
        continue;
      }

      let dbEntity = await this.entityManager.getRepository(HotelEntity).findOne({
        where: {
          gov_id: item.govId
        }
      });

      if (!!dbEntity) {
        continue;
      }

      const entity = new HotelEntity();
      entity.name = item.name;
      entity.gov_id = item.govId;
      entity.countryCode = item.countryCode;
      dbEntity = await this.entityManager.save(entity);

      savedEntities.push(dbEntity);
    }

    return savedEntities;
  }

  /**
 * Seed all rooms. (20 rooms per hotel)
 *
 * @function
 */
  async createRooms(): Promise<RoomEntity[]> {
    const savedEntities: RoomEntity[] = [];

    for (let i = 0; i < sampleHotels.length; i++) {
      const item = sampleHotels[i];

      let dbHotel = await this.entityManager.getRepository(HotelEntity).findOne({
        where: {
          gov_id: item.govId,
        },
        relations: ['rooms']
      });

      if (!dbHotel) {
        continue;
      }

      const rooms = dbHotel.rooms ?? [];

      for (let k = 1; k <= 20; k++) {
        const found = rooms.find(r => r.code === `room-${k}`);
        if (!!found) {
          continue;
        }

        const newRoom = new RoomEntity();
        newRoom.code = `room-${k}`;
        newRoom.hotel = dbHotel;
        rooms.push(newRoom);
        savedEntities.push(newRoom);
      }
    }

    await this.entityManager.save(savedEntities);

    return savedEntities;
  }
}
