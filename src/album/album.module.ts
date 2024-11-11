import { Module } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [],
  exports: [],
})
export class AlbumsModule {}
