// api
import { tokensInstance } from 'api';

const TokenFetcher = (url: string) =>
  tokensInstance.get(url).then((res) => res.data);

export default TokenFetcher;
