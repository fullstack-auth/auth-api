import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  // JwtService import
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {};


  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (user && (await bcrypt.compare(password, user.password))) { return user }
    return null
  };

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } })
    if (existingUser) { throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST) }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword })
    await this.userRepository.save(newUser)

    const payload = { username: newUser.username, sub: newUser.id }
    return {
      user: newUser,
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    }
  };
  
  async getUsers() { return this.userRepository.find() }

  async loginUser(user: LoginDto) {
    const dbUser = await this.userRepository.findOne({ where: { username: user.username } })
    if (!dbUser) { throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED) }

    const payload = { username: dbUser.username, sub: dbUser.id }
    return { access_token: this.jwtService.sign(payload, { expiresIn: '1h' }) };
  };

  async deleteUserById(id: string): Promise<User | null> {
    const userId = parseInt(id, 10)
    if (isNaN(userId)) { throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST) }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) { return null }

    await this.userRepository.remove(user)
    return user
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const numericId = parseInt(id, 10);
    const user = await this.userRepository.findOne({ where: { id: numericId } });

    if (!user) { return null }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    const numericId = parseInt(id, 10);
    const user = await this.userRepository.findOne({ where: { id: numericId } });

    if (!user) { return null } return user; 
  }

  
}
