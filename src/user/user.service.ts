import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { users } from 'src/db/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './types/user.type';

@Injectable()
export class UserService {
  getAllUsers() {
    return users;
  }

  getOneUser(id: string) {
    const user = users.find((item) => item.id === id);

    if (!user)
      throw new NotFoundException({
        message: 'User not found',
        code: 'USER_NOT_FOUND',
      });

    return user;
  }

  createUser(dto: CreateUserDto) {
    const currentDate = new Date().getDate();

    if (!dto.login || !dto.password) {
      throw new ForbiddenException({
        message: 'Does not contain required fields',
        code: 'NOT_REQUIRED_FIELDS',
      });
    }

    const newUser: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: String(currentDate),
      updatedAt: String(currentDate),
    };

    users.push(newUser);

    return newUser;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    const currentDate = new Date().getDate();
    const userIndex = users.findIndex((item) => item.id === id);
    const user = users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    }

    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException({
        message: 'Wrong password',
        code: 'WRONG_PASSWORD',
      });
    }

    const newUser: User = {
      ...user,
      password: dto.newPassword,
      updatedAt: String(currentDate),
      version: user.version + 1,
    };

    users.splice(userIndex, 1, newUser);

    return newUser;
  }

  deleteUser(id: string) {
    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex === -1)
      throw new NotFoundException({
        message: 'User not found',
        code: 'USER_NOT_FOUND',
      });

    users.splice(userIndex, 1);
  }
}
