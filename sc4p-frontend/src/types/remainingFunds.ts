export interface RemainingFunds {
  id: number;
  owner_id: number;
  beneficiary_name: string;
  allocation_percentage: number;
  created_at: Date;
}

export interface CreateRemainingFunds {
  owner_id: number;
  beneficiary_name: string;
  allocation_percentage: number;
}

export interface UpdateRemainingFunds extends Partial<CreateRemainingFunds> {}
