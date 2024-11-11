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

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'List of tracks.' })
  getAll() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 200, description: 'Track found.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.getOneTrack(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({ status: 201, description: 'Track created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() userDto: CreateTrackDto) {
    return this.trackService.createTrack(userDto);
  }

  @Put('/:id')
  update(
    @Body() userDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.trackService.updateTrack(id, userDto);
  }

  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
