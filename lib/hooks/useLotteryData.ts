import { LOTTERY_ABI, LOTTERY_ADDRESS } from '@/config/lottery-contract';
import { useContractRead } from 'wagmi';

export default function useLotteryData() {
  const { data: lotteryCurrentRound } = useContractRead({
    watch: true,
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'round',
  });

  const { data: ticketPrice } = useContractRead({
    watch: true,
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'ticketPrices',
  });

  const { data: lotteryTimestamp } = useContractRead({
    watch: true,
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'lotteryTimestamp',
  });

  return { lotteryCurrentRound, ticketPrice, lotteryTimestamp };
}
