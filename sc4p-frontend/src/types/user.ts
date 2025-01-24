export interface UserType {
  id: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cell_phone: string;
  home_phone: string | null;
  work_phone: string | null;
  created_at: Date;
}

export interface CreateUser {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cell_phone: string;
  home_phone?: string;
  work_phone?: string;
}

export interface UpdateUser extends Partial<CreateUser> {}
