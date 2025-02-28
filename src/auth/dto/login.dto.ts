import { ApiProperty } from '@nestjs/swagger';

export const username = "John";
export const password = "open";

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
