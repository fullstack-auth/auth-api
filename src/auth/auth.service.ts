import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  private readonly users: CreateUserDto[] = [
    {
      username: "John",
      password: "open",
      mail: 'john@example.com',
      birthDate: "2024-12-05",
      gender: "male",
      phoneNumber: 0,
      adress: "Baker-St. 18",
      country: "Spain",
    },
  ];

  getUsers() {
    return this.users;
  }

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((user) => user.username === username)
    if (user && user.password === password) { return user }
    return null
  };

  async login(user: LoginDto) {
    const payload = { username: user.username }
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' })
    return { access_token: accessToken }
  };

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = this.users.find((user) => user.username === createUserDto.username);
    if (existingUser) { return { message: 'Username already taken' } }

    const newUser = {
      username: createUserDto.username,
      password: createUserDto.password,
      mail: createUserDto.mail,
      birthDate: createUserDto.birthDate,
      gender: createUserDto.gender,
      phoneNumber: createUserDto.phoneNumber,
      adress: createUserDto.adress,
      country: createUserDto.country
    };
    this.users.push(newUser);

    const payload = { username: newUser.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      user: newUser,
      access_token: accessToken,
    };
  }
}
