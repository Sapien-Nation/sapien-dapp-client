export interface Token {
  id: number | null;
  name: string;
  image: string | null;
}

export interface UserTransactions {
  transactionHash: string;
}
