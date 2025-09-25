import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ type: [String], required: false })
  interests?: string[];

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty({ required: false })
  avatarUrl?: string;

  @ApiProperty()
  createdAt: any; // Firestore Timestamp or Date

  @ApiProperty()
  updatedAt: any;
}
