export interface RegisterBody {
  username: string,
  password: string
}

export interface MessageTextBody {
  content: string;
}

export interface MessageListQueryParams {
  page: number;
  limit: number;
}