import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.artistService.getOneArtist(id);
  }

  @Post()
  create(@Body() artistDto: CreateArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @Put('/:id')
  update(@Body() artistDto: UpdateArtistDto, @Param('id') id: string) {
    return this.artistService.updateArtist(id, artistDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
