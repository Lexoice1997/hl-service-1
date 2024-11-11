import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateArtistDto {
  @ApiProperty({ example: 'Beyonce', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
  @ApiProperty({ example: true, description: 'Грэмми' })
  @IsBoolean({message: "Должен быть true или false"})
  readonly grammy: boolean;
}
