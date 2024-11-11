import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artist/artist.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
