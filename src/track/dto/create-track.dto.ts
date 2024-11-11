export class CreateTrackDto {
  readonly name: string;
  readonly duration: number;
  readonly artistId: string | null;
  readonly albumId: string | null;
}
