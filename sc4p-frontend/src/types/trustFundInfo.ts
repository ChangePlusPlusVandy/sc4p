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
  funding_plan?: string;
  bank_account_details?: string;
  life_insurance_policy_number?: string;
  other_funding_details?: string;
}

export interface UpdateTrustFundInfo extends Partial<CreateTrustFundInfo> {}
