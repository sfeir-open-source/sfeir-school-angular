export interface People {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  entity: string;
  entryDate: string;
  birthDate: string;
  gender: string;
  email: string;
  skills: string[];
  geo: {
    lat: number;
    lng: number;
  };
  phone: string;
  address: {
    street: string;
    postalCode: number;
    city: string;
  };
  links: {
    twitter: string;
    slack: string;
    github: string;
    linkedin: string;
  };
  isManager: boolean;
  manager: string;
  managerId: string;
}

export interface PeopleForm {
  id?: string;
  photo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}
