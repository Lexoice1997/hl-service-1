import { Injectable } from '@nestjs/common';
import { albums } from 'src/db/albums';
import { tracks } from 'src/db/tracks';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './types/track.type';

@Injectable()
export class TrackService {
  getAllTracks() {
    return tracks;
  }

  getOneTrack(id: string) {
    return tracks.find((item) => item.id === id);
  }

  createTrack(dto: CreateTrackDto) {
    const newTrack: Track = {
      ...dto,
      id: uuidv4(),
    };

    tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, dto: UpdateTrackDto) {
    const trackIndex = albums.findIndex((item) => item.id === id);

    const newTrack = { ...dto };
    tracks.splice(trackIndex, 1, newTrack);

    return newTrack;
  }

  deleteTrack(id: string) {
    const trackIndex = tracks.findIndex((item) => item.id === id);

    tracks.splice(trackIndex, 1);
  }
}
