import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: "admin",
  })
  username: string;

  @ApiProperty({
    example: "admin",
  })
 password: string;
}
