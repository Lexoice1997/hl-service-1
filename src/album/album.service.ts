import { Injectable } from '@nestjs/common';
import { albums } from 'src/db/albums';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './types/album.types';

@Injectable()
export class AlbumService {
  getAllAlbum() {
    return albums;
  }

  getOneAlbum(id: string) {
    return albums.find((item) => item.id === id);
  }

  createAlbum(dto: CreateAlbumDto) {
    const newAlbum: Album = {
      ...dto,
      id: uuidv4(),
    };

    albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, dto: UpdateAlbumDto) {
    const albumIndex = albums.findIndex((item) => item.id === id);

    const newAlbum = { ...dto };

    albums.splice(albumIndex, 1, newAlbum);

    return newAlbum;
  }

  deleteAlbum(id: string) {
    const albumIndex = albums.findIndex((item) => item.id === id);

    albums.splice(albumIndex, 1);
  }
}
