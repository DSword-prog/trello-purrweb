export class CommentResponse {
  readonly id: string;
  readonly text: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly user: {
    id: string;
    name: string;
    surname: string;
  };
  readonly card: {
    id: string;
    title: string;
    is_archived: boolean;
  };
}
