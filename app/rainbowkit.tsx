'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { octa } from '@/config/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([octa], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: 'Lucky Bucks',
  projectId: process.env.NEXT_PUBLIC_W3M_ID,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RainbowKit({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
