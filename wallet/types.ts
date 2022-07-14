export interface Token {
  id: number | null;
  name: string;
  image: string | null;
}

export interface FTBalance {
  eth: number;
  matic: number;
  spn: number;
}
