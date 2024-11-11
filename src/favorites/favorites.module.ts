import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [],
  exports: [FavoritesService],
})
export class FavoritesModule {}
