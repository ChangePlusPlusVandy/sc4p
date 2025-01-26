import { Decimal } from "@prisma/client/runtime/library";

export interface TrustFundInfo {
  id: number;
  owner_id: number;
  funding_plan: string | null;
  bank_account_details: string | null;
  life_insurance_policy_number: string | null;
  other_funding_details: string | null;
  created_at: Date;
}

export interface CreateTrustFundInfo {
  owner_id: number;
  funding_plan?: string | null;
  bank_account_details?: string | null;
  life_insurance_policy_number?: string | null;
  other_funding_details?: string | null;
}

export interface UpdateTrustFundInfo {
  funding_plan?: string | null;
  bank_account_details?: string | null;
  life_insurance_policy_number?: string | null;
  other_funding_details?: string | null;
}

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
  allocated_amount: Decimal | null;
  created_at: Date;
}

export interface CreateTrustee {
  trust_fund_id: number;
  trustee_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone?: string | null;
  cell_phone: string;
  emergency_phone?: string | null;
  email: string;
  allocated_amount?: Decimal | null;
}

export interface UpdateTrustee {
  trustee_name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  home_phone?: string | null;
  cell_phone?: string;
  emergency_phone?: string | null;
  email?: string;
  allocated_amount?: Decimal | null;
}
