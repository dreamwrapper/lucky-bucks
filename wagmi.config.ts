import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { LOTTERY_ABI, LOTTERY_ADDRESS } from './config/lottery-contract';
import { TOKEN_ABI, TOKEN_ADDRESS } from './config/token-contract';

export default defineConfig({
  out: 'generated.ts',
  contracts: [
    {
      name: 'LuckyBucks',
      abi: TOKEN_ABI,
      address: TOKEN_ADDRESS,
    },
    {
      name: 'LBCLottery',
      abi: LOTTERY_ABI,
      address: LOTTERY_ADDRESS,
    },
  ],
  plugins: [react()],
});
