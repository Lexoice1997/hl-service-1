import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAllAlbum();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.albumService.getOneAlbum(id);
  }

  @Post()
  create(@Body() userDto: CreateAlbumDto) {
    return this.albumService.createAlbum(userDto);
  }

  @Put('/:id')
  update(@Body() userDto: UpdateAlbumDto, @Param('id') id: string) {
    return this.albumService.updateAlbum(id, userDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
