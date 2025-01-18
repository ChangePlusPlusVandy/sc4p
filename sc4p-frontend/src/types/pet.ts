import { Decimal } from "@prisma/client/runtime/library";

export interface Pet {
  id: number;
  name: string;
  sex: string;
  date_of_birth: Date | null;
  spayed_neutered: boolean | null;
  type: string;
  microchip_id: string | null;
  license_number: string | null;
  medical_history: string | null;
  special_needs: string | null;
  special_diet: string | null;
  behavioral_habits: string | null;
  commands: string | null;
  daily_routine: string | null;
  allowed_outside: boolean | null;
  sleep_location: string | null;
  likes_children: boolean | null;
  home_access: string | null;
  favorite_items: string | null;
  flea_prevention: string | null;
  allergies: string | null;
  special_care_instructions: string | null;
  medical_history_location: string | null;
  food_brand: string | null;
  food_amount: string | null;
  feeding_schedule: string | null;
  medications: string | null;
  emergency_supplies: string | null;
  health_insurance_provider: string | null;
  health_insurance_policy_number: string | null;
  health_insurance_cost: Decimal | null;
  euthanasia_decision: string | null;
  remains_care: string | null;
  allocated_remains_fund: Decimal | null;
  created_at: Date;
  owner_id: number;
}

export interface CreatePet {
  name: string;
  sex: "Male" | "Female";
  date_of_birth: Date;
  spayed_neutered: boolean;
  type: string;
  owner_id: number;
  microchip_id?: string | null;
  license_number?: string | null;
  medical_history?: string | null;
  special_needs?: string | null;
  special_diet?: string | null;
  behavioral_habits?: string | null;
  commands?: string | null;
  daily_routine?: string | null;
  allowed_outside?: boolean | null;
  sleep_location?: string | null;
  likes_children?: boolean | null;
  home_access?: string | null;
  favorite_items?: string | null;
  flea_prevention?: string | null;
  allergies?: string | null;
  special_care_instructions?: string | null;
  medical_history_location?: string | null;
  food_brand?: string | null;
  food_amount?: string | null;
  feeding_schedule?: string | null;
  medications?: string | null;
  emergency_supplies?: string | null;
  health_insurance_provider?: string | null;
  health_insurance_policy_number?: string | null;
  health_insurance_cost?: number | null;
  euthanasia_decision: string;
  remains_care: string;
  allocated_remains_fund?: number | null;
}

export interface UpdatePet extends Partial<CreatePet> {}
