import Web3 from 'web3';

const Wallet = async (
  publicAddress: string,
  provider = 'wss://mainnet.infura.io/ws/v3/a06179972d04497086ad0c2299c0426c'
) => {
  async function getBalance() {
    try {
      const web3 = new Web3(provider);
      const balance = await web3.eth.getBalance(publicAddress);
      return balance;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    balance: await getBalance(),
    getBalance,
  };
};

export default Wallet;
