import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'List of favorites.' })
  getAll() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 201, description: 'Artist added to favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Artist not found.' })
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.createFavoriteArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 204, description: 'Artist deleted from favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist  is not favorite.' })
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 201, description: 'Album added to favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Album not found.' })
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.createFavoriteAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 204, description: 'Album deleted from favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album is not favorite.' })
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 201, description: 'Track added to favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Track not found.' })
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.createFavoriteTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 204, description: 'Track deleted from favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track is not favorite.' })
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteTrack(id);
  }
}
