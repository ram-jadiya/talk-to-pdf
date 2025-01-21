export interface Feature {
  title: string;
  desc: string;
  isAvailable: boolean;
}

export interface Plan {
  id: number;
  title: string;
  desc: string;
  price: number;
  validity: number;
  validityDesc: string;
  features: Feature[];
}

export type Plans = Plan[];
