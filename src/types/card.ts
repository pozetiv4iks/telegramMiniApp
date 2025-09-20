export interface CardLimits {
  all_time_enabled: boolean;
  all_time_cap: number;
  all_time_spent: number;
  daily_enabled: boolean;
  daily_cap: number;
  daily_spent: number;
  weekly_enabled: boolean;
  weekly_cap: number;
  weekly_spent: number;
  monthly_enabled: boolean;
  monthly_cap: number;
  monthly_spent: number;
  yearly_enabled: boolean;
  yearly_cap: number;
  yearly_spent: number;
  per_transaction_enabled: boolean;
  per_transaction_cap: number;
  per_transaction_spent: number;
}

export interface Card {
  id: string;
  title: string;
  last4: string;
  expiration_date: string;
  expiration_date_short: string;
  form_factor: string;
  status: string;
  currency: string;
  created_at: string;
  updated_at: string;
  sub_account_id: string;
  vendor_sub_account_id: string;
  brand: string;
  vendor_id: string;
  vendor_card_id: string;
  tokenizable: boolean;
  spend_cap: number;
  spent_amount: number;
  card_name: string;
  email: string;
  mobile: string;
  type: string;
  wallet_id: string;
  program_id: string;
  limits: CardLimits;
}

export interface CardsResponse {
  success: boolean;
  data: Card[];
}

export interface Merchant {
  name: string;
  category_code: string;
  city: string;
  country: string;
}

export type TransactionStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'CANCELED';

export interface Transaction {
  vendor_transaction_id: string;
  created_at: string;
  cleared_at: string | null;
  merchant: Merchant;
  last4: string;
  title: string;
  billing_amount: number;
  billing_currency: string;
  transaction_amount: number;
  transaction_currency: string;
  conversion_rate: number;
  vendor_card_id: string;
  vendor_sub_account_id: string | null;
  failure_reason: string;
  status: TransactionStatus;
  transaction_type: string;
  is_credit: boolean;
  has_receipt: boolean;
  adjustment_type: string | null;
  review_status: string | null;
  group: string;
  total_amount: number;
  card_id: string;
}

export interface TransactionsResponse {
  success: boolean;
  data: Transaction[];
}
