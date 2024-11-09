export interface Caregiver {
  owner_id: number;
  caregiver_id: number;
  care_type: string;
  primary: boolean;
  accepted: boolean;
  created_at: Date;
  }