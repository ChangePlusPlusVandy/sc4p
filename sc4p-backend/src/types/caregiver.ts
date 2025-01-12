export interface Caregiver {
  id: number;
  owner_id: number;
  name: string;
  care_type: string;
  primary: boolean;
  created_at: Date;
}

export interface CreateCaregiver {
  owner_id: number;
  name: string;
  care_type: "short-term" | "long-term" | "both";
  primary: boolean;
}

export interface UpdateCaregiver extends Partial<CreateCaregiver> {}
