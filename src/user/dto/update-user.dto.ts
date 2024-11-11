import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly oldPassword: string;
  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly newPassword: string;
}
