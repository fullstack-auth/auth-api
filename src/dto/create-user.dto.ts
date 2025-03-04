// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    example: 'admin',
  })
  password: string;

  @ApiProperty({
    example: 'susan@example.com',
  })
  mail: string

  @ApiProperty({
    example: '2001-01-12',
  })
  birthDate: string

  @ApiProperty({
    example: 'male',
  })
  gender: string

  @ApiProperty({
    example: 0,
  })
  phoneNumber: number

  @ApiProperty({
    example: `Baker-St. 18`,
  })
  adress: string

  @ApiProperty({
    example: 'Spain',
  })
  country: string
}
