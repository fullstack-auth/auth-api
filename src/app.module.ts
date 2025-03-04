import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
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
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: JwtService,
      useFactory: () => {
        return new JwtService({
          secret: 'your-secret-key',
          signOptions: { expiresIn: '1h' },
        });
      },
    },
  ],
})
export class AppModule {}
