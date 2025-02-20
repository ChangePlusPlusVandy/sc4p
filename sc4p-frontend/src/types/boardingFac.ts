export interface BoardingFac {
  id: number;
  owner_id: number;
  contact_name: string;
  daily_charge: number | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone: string | null;
  cell_phone: string;
  email: string | null;
  created_at: Date;
}

export interface CreateBoardingFac {
  owner_id: number;
  contact_name: string;
  daily_charge?: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone?: string;
  cell_phone: string;
  email?: string;
}

export interface UpdateBoardingFac extends Partial<CreateBoardingFac> {}
