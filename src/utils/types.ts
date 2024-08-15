import type { Static } from "@fastify/type-provider-typebox";

/**
 * Тип можна заінферити з TypeBox схеми за допомогою Static
 */
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