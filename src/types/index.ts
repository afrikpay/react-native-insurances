export type DropdownItemType = {
  label: string;
  value: string;
}

export type Model = {
  id: string;
  libelle: string;
}


export interface Souscription {
  referenceNumber: string,
  subscriptionId: string | null,
  providerStatus: string,
  product: string,
  amount: number | null,
  insurer: Insurer,
  insurerId: string,
  insurerName: string,
  planName: string,
  planId: string,
  plan: Plan,
  formId: string | null,
  subscribeAt: string | null,
  startAt: string | null,
  endAt: string | null,
  owners: Owner[],
  error: string | null
}

export interface Owner {
  "id": string;
}

export interface Plan {
  id: number;
  name: string;
  description:  string;
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
  id: number,
  slug: string,
  name: string,
  description: string,
  image: string
}


export interface Field {
  id: number,
  order: number,
  label: string,
  readable_label: string,
  field_type: string,
  options_list: any[],
  is_required: false,
  value: any
}