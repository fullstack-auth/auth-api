import { ApiProperty } from '@nestjs/swagger';

export const username = "admin";
export const password = "admin";

export class LoginDto {
  @ApiProperty({
    example: username,
  })
  username: string;

  @ApiProperty({
    example: password,
  })
 password: string;
}
