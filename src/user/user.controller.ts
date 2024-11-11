import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(@Body() userDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
