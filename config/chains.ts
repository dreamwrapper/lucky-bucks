import { Chain } from 'wagmi';

export const octa = {
  id: 800001,
  name: 'Octa',
  network: 'octa',
  nativeCurrency: {
    decimals: 18,
    name: 'Octa',
    symbol: 'OCTA',
  },
  rpcUrls: {
    public: { http: ['https://rpc.octa.space/'] },
    default: { http: ['https://rpc.octa.space/'] },
  },
  blockExplorers: {
    etherscan: { name: 'Octa Scan', url: 'https://scan.octa.space/' },
    default: { name: 'Octa Scan', url: 'https://scan.octa.space/' },
  },
} as const satisfies Chain;
