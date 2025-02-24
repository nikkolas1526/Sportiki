export interface Product {
  id: number;
  name: string;
  photo: string | null;
  price: number;
  number: number | null;
  rate: number;
  sale: number;
  availability: boolean;
  description: string | null;
  kategory: string;
  characteristics:
    | Roliks
    | Bikes
    | Scooters
    | Protective_Equipment
    | Balls
    | Gloves
    | null;
}
export interface Views {
  viewed_account_id: number;
  item_id: number;
  rate: number;
  viewtext: string | null;
  namee: string | null;
  answer: string | null;
}
export interface Roliks {
  item_id: number | null;
  roliks_size: number | null;
  roliks_type: string | null;
  roliks_wheels: number | null;
  roliks_brand: string | null;
  roliks_country: string | null;
}

export interface Bikes {
  item_id: number | null;
  bikes_type: string | null;
  bikes_power: number | null;
  bikes_battery: number | null;
  bikes_weight: number | null;
  bikes_wheel_size: number | null;
  bikes_material: string | null;
  bikes_brand: string | null;
  bikes_country: string | null;
}
export interface Scooters {
  item_id: number | null;
  scooters_type: string | null;
  scooters_weight: number | null;
  scooters_wheel_size: number | null;
  scooters_brand: string | null;
  scooters_country: string | null;
}
export interface Balls {
  item_id: number | null;
  balls_type: string | null;
  balls_size: number | null;
  balls_brand: string | null;
  balls_country: string | null;
}

export interface Protective_Equipment {
  item_id: number | null;
  protective_equipment_sport: string | null;
  protective_equipment_type: string | null;
  protective_equipment_size: string | null;
  protective_equipment_brand: string | null;
  protective_equipment_country: string | null;
}

export interface Gloves {
  item_id: number | null;
  gloves_type: string | null;
  gloves_size: number | null;
  gloves_material: string | null;
  gloves_brand: string | null;
  gloves_country: string | null;
}
