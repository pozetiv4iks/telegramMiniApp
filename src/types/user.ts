// Типы для работы с пользователями

export interface User {
  id: string;
  nick_name: string;
  telegram_id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'banned';
  metadata?: {
    wallet_id?: string;
    sub_account_id?: string;
    last_activity?: string;
    [key: string]: any;
  };
}

export interface CreateUserRequest {
  nick_name: string;
  telegram_id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
  metadata?: {
    wallet_id?: string;
    sub_account_id?: string;
    [key: string]: any;
  };
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  status?: 'active' | 'inactive' | 'banned';
  metadata?: {
    wallet_id?: string;
    sub_account_id?: string;
    last_activity?: string;
    [key: string]: any;
  };
}

export interface UserSearchParams {
  nick_name?: string;
  telegram_id?: string;
  username?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
}

export interface UserSession {
  user: User;
  isNewUser: boolean;
  sessionId: string;
  loginTime: string;
}
