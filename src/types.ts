export type DropdownItemType = {
  label: string;
  value: string;
};

export type Model = {
  id: string;
  libelle: string;
};

export interface Souscription {
  id: string;
  reference: string;
  owners: string[];
  customer: string | null;
  amount: number | null;
  data: Record<string, any> | null;
  plan: Plan;
  product: string;
  insurer: Insurer;
  accepted_at: string | null;
  subscribed_at: string | null;
  start_at: string | null;
  end_at: string | null;
  status: string;
  display_status: string;
  duration_display: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  unit: string;
  duration_display: string;
}

export interface Insurer {
  id: number;
  name: string;
  logo: string;
  shortDescription: string;
}

export interface ProduitAssurance {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Field {
  id: number;
  order: number;
  label: string;
  readable_label: string;
  field_type: string;
  options_list: any[];
  is_required: false;
  value: any;
}


export type User = {
  _id?: string;
  email: string;
  phone: string;
  name: string;
  accountId: string;
  username: string;
  accountNumber: string;
  idNumber: string;
  accountDepositBalance?: number;
  accountCommissionBalance?: number;
  language: string;
  birthDate: string;
  gender: string;
  depositAccounts: any[];
  terminal: any,
}