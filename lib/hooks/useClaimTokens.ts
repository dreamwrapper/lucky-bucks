import { LOTTERY_ABI, LOTTERY_ADDRESS } from '@/config/lottery-contract';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export default function useClaimTokens(
  lotteryRound: number,
  isWinner: boolean,
  isClaimed: boolean
) {
  const { config } = usePrepareContractWrite({
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'claimTokens',
    args: [lotteryRound],
    enabled: isWinner && !isClaimed,
  });

  const {
    write,
    data,
    isLoading: isClaimTokensLoading,
  } = useContractWrite(config);

  const { isLoading: isTxStateLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { write, isClaimTokensLoading, isTxStateLoading };
}
