import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({ example: '12345' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ required: false, example: 'I love coding!' })
  bio?: string;

  @ApiProperty({
    type: [String],
    required: false,
    example: ['coding', 'music'],
  })
  interests?: string[];

  @ApiProperty({ required: false, example: 'New York, USA' })
  location?: string;

  @ApiProperty({ required: false, example: 'https://example.com/avatar.png' })
  avatarUrl?: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;
}
