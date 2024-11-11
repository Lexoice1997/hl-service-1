import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty({ example: 'Beyonce', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
  @ApiProperty({ example: 200, description: 'Год' })
  @IsNumber()
  readonly duration: number;
  @ApiProperty({ example: 'uuID', description: 'ID' })
  @IsUUID()
  readonly artistId: string | null;
  @ApiProperty({ example: 'uuID', description: 'ID' })
  @IsUUID()
  readonly albumId: string | null;
}
