export interface Caregiver {
  id: number;
  owner_id: number;
  name: string;
  care_type: string;
  primary: boolean;
  accepted: boolean;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  created_at: Date;
}

export interface CreateCaregiver {
  name: string;
  care_type: "short-term" | "long-term" | "both";
  primary: string;
  accepted: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface UpdateCaregiver extends Partial<CreateCaregiver> {}
