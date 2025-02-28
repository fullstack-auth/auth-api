import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Use a secret key for signing the JWT (you can store this in environment variables)
      signOptions: { expiresIn: '1h' }, // Set expiration time for the JWT (e.g., 1 hour)
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
