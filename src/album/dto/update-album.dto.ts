export class UpdateAlbumDto {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly artistId: string | null;
}
