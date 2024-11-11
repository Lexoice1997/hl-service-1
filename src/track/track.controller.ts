import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.trackService.getOneTrack(id);
  }

  @Post()
  create(@Body() userDto: CreateTrackDto) {
    return this.trackService.createTrack(userDto);
  }

  @Put('/:id')
  update(@Body() userDto: UpdateTrackDto, @Param('id') id: string) {
    return this.trackService.updateTrack(id, userDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
