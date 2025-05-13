import { ApiProperty } from '@nestjs/swagger';

export class CommentResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  readonly id: string;

  @ApiProperty({ example: 'This is a comment' })
  readonly text: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  readonly created_at: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  readonly updated_at: Date;

  @ApiProperty({
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John',
      surname: 'Doe',
    },
  })
  readonly user: {
    id: string;
    name: string;
    surname: string;
  };

  @ApiProperty({
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'CoolCard',
      is_archived: false,
    },
  })
  readonly card: {
    id: string;
    title: string;
    is_archived: boolean;
  };
}
