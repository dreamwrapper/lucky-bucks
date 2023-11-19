import { useEffect, useState } from 'react';

export default function useMetamask() {
  const [address, setAddress] = useState('');

  const connect = async () => {
    if (typeof window !== 'undefined') {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [],
      });
    }
  };

  function handleAccountsChanged(accounts: any) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      setAddress('');
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
    }
  }

  useEffect(() => {
    window.ethereum
      .request({
        method: 'eth_accounts',
        params: [],
      })
      .then(handleAccountsChanged);

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('disconnect', handleAccountsChanged);
  }, []);

  return { address, connect };
}
