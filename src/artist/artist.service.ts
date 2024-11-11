import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { albums } from 'src/db/albums';
import { artists } from 'src/db/artists';
import { favorites } from 'src/db/favorites';
import { tracks } from 'src/db/tracks';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './types/artist.type';

@Injectable()
export class ArtistService {
  getAllArtists() {
    return artists;
  }

  getOneArtist(id: string) {
    const artist = artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException({
        message: 'Artist not found',
        code: 'ARTIST_NOT_FOUND',
      });
    }

    return artist;
  }

  createArtist(dto: CreateArtistDto) {
    if (!dto.name || !dto.grammy) {
      throw new ForbiddenException({
        message: 'Does not contain required fields',
        code: 'NOT_REQUIRED_FIELDS',
      });
    }

    const newArtist: Artist = { ...dto, id: uuidv4() };
    artists.push(newArtist);

    return dto;
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    const artistIndex = artists.findIndex((item) => item.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException({
        message: 'Artist not found',
        code: 'ARTIST_NOT_FOUND',
      });
    }

    const newArtist: Artist = { ...dto, id };

    artists.splice(artistIndex, 1, newArtist);

    return newArtist;
  }

  deleteArtist(id: string) {
    const artistIndex = artists.findIndex((item) => item.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException({
        message: 'Artist not found',
        code: 'ARTIST_NOT_FOUND',
      });
    }

    albums.forEach((item, idx) => {
      if (item.artistId === id) {
        albums[idx].artistId = null;
      }
    });

    tracks.forEach((item, idx) => {
      if (item.artistId === id) {
        albums[idx].artistId = null;
      }
    });

    const favoriteArtistIdx = favorites.artists.findIndex(
      (item) => item === id,
    );

    favorites.artists.splice(favoriteArtistIdx, 1);

    artists.splice(artistIndex, 1);
  }
}
