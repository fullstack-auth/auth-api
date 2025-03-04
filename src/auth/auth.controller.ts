import { Controller, Post, Get, Body, HttpException, HttpStatus, Delete, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') //Change endppoints
  @ApiOperation({ summary: 'Create a new user and return JWT token' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  };

  @Post('login') //Change endppoints
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ type: LoginUserDto })
  async loginUser(@Body() body: LoginUserDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) { throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED) } 
    return this.authService.loginUser(user);
  };

  @Get('users') //Change endppoints
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() { return this.authService.getUsers() };

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(@Param('id') id: string) {
    const user = await this.authService.getUserById(id)
    if (!user) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return user
  }
  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user by ID' })
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.authService.deleteUserById(id)
    if (!deletedUser) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return { message: 'User deleted successfully' }
  };

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBody({ type: UpdateUserDto, description: 'User data to be updated' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.authService.updateUserById(id, updateUserDto)
    if (!user) { throw new HttpException('User not found', HttpStatus.NOT_FOUND) }
    return { message: 'User updated successfully' }
  };
}
