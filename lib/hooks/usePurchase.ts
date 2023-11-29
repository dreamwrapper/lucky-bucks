import { LOTTERY_ABI, LOTTERY_ADDRESS } from '@/config/lottery-contract';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export default function usePurchase(allowance: bigint | undefined, tickets: [[number, number, number, number, number, number]]) {
  const { config } = usePrepareContractWrite({
    abi: LOTTERY_ABI,
    address: LOTTERY_ADDRESS,
    functionName: 'purchase',
    args: [tickets],
    enabled: !!allowance,
  });

  const { data, write: purchase, isLoading: isPurchasing } = useContractWrite(config);

  const { isLoading: isPurchaseTxLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { purchase, isPurchasing, isPurchaseTxLoading };
}
