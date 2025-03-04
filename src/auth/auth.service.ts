import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  // JwtService import
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,  // Inject JwtService directly
  ) {}

  // Get all users
  async getUsers() {
    return this.userRepository.find();
  }

  // Validate the user's username and password
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Login and generate JWT token
  async login(user: LoginDto) {
    const dbUser = await this.userRepository.findOne({ where: { username: user.username } });
    if (!dbUser) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: dbUser.username, sub: dbUser.id };
    // Manually signing the JWT token
    return { access_token: this.jwtService.sign(payload, { expiresIn: '1h' }) };
  }

  // Create a new user, hash password, and generate JWT token
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUser) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    await this.userRepository.save(newUser);

    const payload = { username: newUser.username, sub: newUser.id };
    // Manually signing the JWT token
    return {
      user: newUser,
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }
}
