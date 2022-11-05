import { NestFactory } from '@nestjs/core';
import Seeder from './seeder';
import { SeederModule } from './seeder.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(() => {
          console.debug('Seeding complete!');
        })
        .catch((error) => {
          console.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
