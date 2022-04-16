export interface MetaTxParams {
  functionSignature: string;
  contract: any;
  contractAddress: string;
  domainData: any;
}

export interface Token {
  name: string;
  description: string;
  image: string;
}

export interface TXDetails {
  id: string;
}

export interface WTXDetails {
  id: string;
}
