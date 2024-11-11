import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Beyonce', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
  @ApiProperty({ example: 1997, description: 'Год' })
  @IsNumber()
  readonly year: number;
  @ApiProperty({ example: 'uuID', description: 'ID' })
  @IsUUID()
  readonly artistId: string | null;
}
