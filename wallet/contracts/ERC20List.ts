import { default as USDCContractAbi } from './erc20/USDC.json';
import { default as USDTContractAbi } from './erc20/USDT.json';
import { default as SPNContractAbi } from './Platform.json';
import { default as WethContractAbi } from './WETH.json';

const ERC20List = {
  SPN: {
    addr: process.env.NEXT_PUBLIC_SPN_TOKEN_ADDRESS,
    abi: SPNContractAbi,
  },
  WETH: {
    addr: process.env.NEXT_PUBLIC_WETH_ADDRESS,
    abi: WethContractAbi,
  },
  USDT: {
    addr: process.env.NEXT_PUBLIC_USDT_ADDRESS,
    abi: USDTContractAbi,
  },
  USDC: {
    addr: process.env.NEXT_PUBLIC_USDC_ADDRESS,
    abi: USDCContractAbi,
  },
};

export default ERC20List;
