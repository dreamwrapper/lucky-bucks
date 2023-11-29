import { LOTTERY_ABI, LOTTERY_ADDRESS } from '@/config/lottery-contract';
import { TOKEN_ABI, TOKEN_ADDRESS } from '@/config/token-contract';
import { useAccount, useContractRead } from 'wagmi';

export default function useUserData(lotteryRound: number) {
  const { address } = useAccount();

  const { data: userLotteryData } = useContractRead({
    watch: true,
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'user',
    args: [address as `0x${string}`, lotteryRound],
  });

  const { data: userTokenBalances } = useContractRead({
    watch: true,
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const { data: userOwnedTickets } = useContractRead({
    watch: true,
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'userOwnedTickets',
    args: [address as `0x${string}`],
  });

  return {
    userLotteryData,
    userTokenBalances,
    userOwnedTickets,
  };
}
