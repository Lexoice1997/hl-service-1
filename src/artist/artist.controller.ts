import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'List of artists.' })
  getAll() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 200, description: 'Artist found.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.getOneArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({ status: 201, description: 'Artist created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() artistDto: CreateArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update artist info' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 200, description: 'Artist updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  update(
    @Body() artistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.artistService.updateArtist(id, artistDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
