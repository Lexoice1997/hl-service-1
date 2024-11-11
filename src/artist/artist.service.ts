import { Injectable } from '@nestjs/common';
import { artists } from 'src/db/artists';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './types/artist.type';

@Injectable()
export class ArtistService {
  getAllArtists() {
    return artists;
  }

  getOneArtist(id: string) {
    return artists.find((item) => item.id === id);
  }

  createArtist(dto: CreateArtistDto) {
    const newArtist: Artist = { ...dto, id: uuidv4() };
    artists.push(newArtist);

    return dto;
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    const artistIndex = artists.findIndex((item) => item.id === id);
    const newArtist: Artist = { ...dto };

    artists.splice(artistIndex, 1, newArtist);

    return newArtist;
  }

  deleteArtist(id: string) {
    const artistIndex = artists.findIndex((item) => item.id === id);

    artists.splice(artistIndex, 1);
  }
}
