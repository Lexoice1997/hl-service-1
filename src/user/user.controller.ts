import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getOneUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Old password is wrong.' })
  update(
    @Body() userDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.deleteUser(id);
  }
}
