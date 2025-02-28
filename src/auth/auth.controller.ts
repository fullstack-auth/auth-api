import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; 
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) { return { message: 'Invalid credentials' } }
    return this.authService.login(user)
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    try {
      return this.authService.getUsers(); // Returns the list of users
    } catch (error) {
      throw new Error('Error occurred while fetching users');
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a new user and return JWT token' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
