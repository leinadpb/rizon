import CountryEntity from 'src/entities/country.entity';
import HotelEntity from 'src/entities/hotel.entity';
import ReservationEntity from 'src/entities/reservation.entity';
import RoomEntity from 'src/entities/room.entity';
import UserEntity from 'src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
const dotenv = require('dotenv');

dotenv.config();

const env = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: process.env.POSTGRES_SSL === 'true',
    url: process.env.POSTGRES_DATABASE_URL,
};

export const dbConfig: DataSourceOptions = {
    name: 'default',
    type: 'postgres',
    url: env.url,
    entities: [UserEntity, HotelEntity, RoomEntity, CountryEntity, ReservationEntity],
    synchronize: true,
    migrations: ['dist/migration/*{.ts,.js}'],
    migrationsTableName: 'migration',
    migrationsRun: false,
    dropSchema: false,
    ssl: env.ssl
        ? {
            rejectUnauthorized: false,
        }
        : false,
};

export const dataSource = new DataSource(dbConfig);
dataSource
    .initialize()
    .then(() => {
        console.log('Successfully initialized DB');
    })
    .catch((e) => {
        console.error('Could not initialize DB: ', e);
        console.log('env db:', env);
        console.log('env full:', process.env);
    });
