export class ColumnsResponse {
  readonly id: string;
  readonly title: string;
  readonly is_archived: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly user: {
    id: string;
    name: string;
    surname: string;
  };
}
