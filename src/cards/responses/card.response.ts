import { ApiProperty } from '@nestjs/swagger';

export class CardResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  readonly id: string;

  @ApiProperty({ example: 'CoolCard' })
  readonly title: string;

  @ApiProperty({ example: 'Description' })
  readonly description: string;

  @ApiProperty({ example: false })
  readonly is_archived: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  readonly created_at: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  readonly updated_at: Date;

  @ApiProperty({
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'CoolColumn',
    },
  })
  readonly column: {
    id: string;
    title: string;
  };
}
