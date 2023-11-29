import { MetaMaskInpageProvider } from '@metamask/providers';

export {};

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_W3M_ID: string;
      NEXT_PUBLIC_INFURA_API_KEY: string;
    }
  }
}
