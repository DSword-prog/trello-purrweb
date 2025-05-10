export class CardResponse {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly is_archived: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly column: {
    id: string;
    title: string;
  };
}
