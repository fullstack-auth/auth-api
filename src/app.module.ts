import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';  // Import JwtService
import * as jwt from 'jsonwebtoken';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'auth_users',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'users',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),  // Ensure User entity is registered
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: JwtService,
      useFactory: () => {
        return new JwtService({
          secret: 'your-secret-key', // You can also use environment variables here
          signOptions: { expiresIn: '1h' },  // Set the expiration time
        });
      },
    },
  ],
})
export class AppModule {}
