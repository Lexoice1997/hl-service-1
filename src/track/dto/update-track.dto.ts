export class UpdateTrackDto {
  readonly id: string;
  readonly name: string;
  readonly duration: number;
  readonly artistId: string | null;
  readonly albumId: string | null;
}
