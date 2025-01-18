export interface EmergencyContact {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  created_at: Date;
}

export interface CreateEmergencyContact {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface UpdateEmergencyContact
  extends Partial<CreateEmergencyContact> {}
