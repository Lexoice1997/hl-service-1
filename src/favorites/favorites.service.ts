import { Injectable, NotFoundException } from '@nestjs/common';

import { albums } from 'src/db/albums';
import { artists } from 'src/db/artists';
import { favorites } from 'src/db/favorites';
import { tracks } from 'src/db/tracks';

@Injectable()
export class FavoritesService {
  getAllFavorites() {
    return favorites;
  }

  createFavoriteTrack(id: string) {
    const track = tracks.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException({
        message: 'Track not found',
        code: 'TRACK_NOT_FOUND',
      });
    }

    favorites.tracks.push(track.id);
  }

  createFavoriteAlbum(id: string) {
    const album = albums.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException({
        message: 'Album not found',
        code: 'ALBUM_NOT_FOUND',
      });
    }

    favorites.albums.push(album.id);
  }

  createFavoriteArtist(id: string) {
    const artist = artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException({
        message: 'Artist not found',
        code: 'ARTIST_NOT_FOUND',
      });
    }

    favorites.artists.push(artist.id);
  }

  deleteFavoriteTrack(id: string) {
    const favoriteTrackIndex = favorites.tracks.findIndex(
      (item) => item === id,
    );

    if (favoriteTrackIndex === -1) {
      throw new NotFoundException({
        message: 'Track not in favorites',
        code: 'TRACK_NOT_FOUND',
      });
    }

    favorites.tracks.splice(favoriteTrackIndex, 1);
  }

  deleteFavoriteAlbum(id: string) {
    const favoriteAlbumIndex = favorites.albums.findIndex(
      (item) => item === id,
    );

    if (favoriteAlbumIndex === -1) {
      throw new NotFoundException({
        message: 'Album not in favorites',
        code: 'ALBUM_NOT_FOUND',
      });
    }

    favorites.albums.splice(favoriteAlbumIndex, 1);
  }

  deleteFavoriteArtist(id: string) {
    const favoriteArtistIndex = favorites.artists.findIndex(
      (item) => item === id,
    );

    if (favoriteArtistIndex === -1) {
      throw new NotFoundException({
        message: 'Artist not in favorites',
        code: 'ARTIST_NOT_FOUND',
      });
    }

    favorites.artists.splice(favoriteArtistIndex, 1);
  }
}
