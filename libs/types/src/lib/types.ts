type Address = {
  street: string;
  postalCode: number;
  city: string;
};

export type Person = {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  entity: string;
  entryDate: Date;
  birthDate: Date;
  gender: string;
  email: string;
  skills: string[];
  phone: string;
  address: Address;
  isManager: boolean;
  manager?: string;
  managerId?: string;
};

export type UpsertPersonBody = {
  photo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export type UiView = 'list' | 'card';
