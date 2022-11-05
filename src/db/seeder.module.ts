import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import Seeder from './seeder';
import { dbConfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig)
  ],
  providers: [SeederService, Seeder],
})
export class SeederModule { }
