import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        example: "newuser",
    })
    username: string;

    @ApiProperty({
        example: "newpassword",
    })
    password: string;

    @ApiProperty({
        example: "newmail@example.com",
      })
      mail: string;
  }
  