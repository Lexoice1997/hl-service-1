import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { albums } from 'src/db/albums';
import { favorites } from 'src/db/favorites';
import { tracks } from 'src/db/tracks';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './types/track.type';

@Injectable()
export class TrackService {
  getAllTracks() {
    return tracks;
  }

  getOneTrack(id: string) {
    const track = tracks.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException({
        message: 'Track not found',
        code: 'TRACK_NOT_FOUND',
      });
    }

    return track;
  }

  createTrack(dto: CreateTrackDto) {
    if (!dto.name || !dto.duration || !dto.albumId || !dto.artistId) {
      throw new ForbiddenException({
        message: 'Does not contain required fields',
        code: 'NOT_REQUIRED_FIELDS',
      });
    }

    const newTrack: Track = {
      ...dto,
      id: uuidv4(),
    };

    tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, dto: UpdateTrackDto) {
    const trackIndex = albums.findIndex((item) => item.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException({
        message: 'Track not found',
        code: 'TRACK_NOT_FOUND',
      });
    }

    const newTrack = { ...dto, id };
    tracks.splice(trackIndex, 1, newTrack);

    return newTrack;
  }

  deleteTrack(id: string) {
    const trackIndex = tracks.findIndex((item) => item.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException({
        message: 'Track not found',
        code: 'TRACK_NOT_FOUND',
      });
    }

    const favoriteTrackIdx = favorites.tracks.findIndex((item) => item === id);

    favorites.tracks.splice(favoriteTrackIdx, 1);

    tracks.splice(trackIndex, 1);
  }
}
