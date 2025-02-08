export interface Veterinarian {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cell_phone: string | null;
  office_phone: string | null;
  emergency_phone: string | null;
  created_at: Date;
}

export interface CreateVeterinarian {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cell_phone: string;
  office_phone?: string;
  emergency_phone?: string;
}

export interface UpdateVeterinarian extends Partial<CreateVeterinarian> {}
