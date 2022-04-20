export interface Passport {
  id: number | null;
  name: string;
  description: string;
  image: string | null;
}

export interface Token {
  id: number;
  name: string;
  description: string;
  image: string;
}
