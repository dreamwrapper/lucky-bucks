import { LOTTERY_ABI, LOTTERY_ADDRESS } from '@/config/lottery-contract';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export default function useLotteryDraw(ticketIndex: number) {
  const { config } = usePrepareContractWrite({
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'draw',
    args: [ticketIndex],
    enabled: ticketIndex > -1 ? true : false,
  });

  const { data, write: drawLottery, isLoading: isDrawing } = useContractWrite(config);

  const { isLoading: isDrawTxLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { drawLottery, isDrawing, isDrawTxLoading };
}
