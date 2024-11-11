import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { albums } from 'src/db/albums';
import { favorites } from 'src/db/favorites';
import { tracks } from 'src/db/tracks';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './types/album.types';

@Injectable()
export class AlbumService {
  getAllAlbum() {
    return albums;
  }

  getOneAlbum(id: string) {
    const album = albums.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException({
        message: 'Album not found',
        code: 'ALBUM_NOT_FOUND',
      });
    }

    return album;
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

    if (albumIndex === -1) {
      throw new NotFoundException({
        message: 'Album not found',
        code: 'ALBUM_NOT_FOUND',
      });
    }

    const newAlbum = { ...dto, id };

    albums.splice(albumIndex, 1, newAlbum);

    return newAlbum;
  }

  deleteAlbum(id: string) {
    const albumIndex = albums.findIndex((item) => item.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException({
        message: 'Album not found',
        code: 'ALBUM_NOT_FOUND',
      });
    }

    tracks.forEach((item, idx) => {
      if (item.artistId === id) {
        albums[idx].artistId = null;
      }
    });

    const favoriteAlbumIdx = favorites.albums.findIndex((item) => item === id);

    favorites.albums.splice(favoriteAlbumIdx, 1);

    albums.splice(albumIndex, 1);
  }
}
