// Типы для работы с пользовательскими данными (tgId, tgIdCard, email)

export interface UserData {
  id: number;
  tgId: string;
  tgIdCard: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDataRequest {
  tgId: string;
  tgIdCard: string;
  email: string;
}

export interface UpdateUserDataRequest {
  tgIdCard?: string;
  email?: string;
}

export interface UserDataQueryParams {
  limit?: number;
  offset?: number;
  tgId?: string;
  email?: string;
}

export interface UserDataResponse {
  success: boolean;
  data: UserData;
  count?: number;
}

export interface UserDataListResponse {
  success: boolean;
  data: UserData[];
  count: number;
}
