import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  private readonly users: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
