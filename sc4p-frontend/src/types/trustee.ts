export interface Trustee {
  id: number;
  trust_fund_id: number;
  trustee_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone: string | null;
  cell_phone: string;
  emergency_phone: string | null;
  email: string;
  allocated_amount: number | null;
  created_at: Date;
}

export interface CreateTrustee {
  trust_fund_id: number;
  trustee_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone?: string;
  cell_phone: string;
  emergency_phone?: string;
  email: string;
  allocated_amount?: number;
}

export interface UpdateTrustee extends Partial<CreateTrustee> {}
