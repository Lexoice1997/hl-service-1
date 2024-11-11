import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlbumsModule } from './album/album.module';
import { ArtistsModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './track/track.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
