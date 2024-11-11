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

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'List of albums.' })
  getAll() {
    return this.albumService.getAllAlbum();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 200, description: 'Album found.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.getOneAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({ status: 201, description: 'Album created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() userDto: CreateAlbumDto) {
    return this.albumService.createAlbum(userDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update album info' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 200, description: 'Album updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  update(
    @Body() userDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.albumService.updateAlbum(id, userDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
