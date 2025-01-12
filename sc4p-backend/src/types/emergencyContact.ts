export interface EmergencyContact {
  id: number;
  owner_id: number;
  contact_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone: string | null;
  cell_phone: string;
  email: string;
  created_at: Date;
}

export interface CreateEmergencyContact {
  owner_id: number;
  contact_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  home_phone?: string;
  cell_phone: string;
  email: string;
}

export interface UpdateEmergencyContact
  extends Partial<CreateEmergencyContact> {}
