import { LOTTERY_ADDRESS } from '@/config/lottery-contract';
import { TOKEN_ABI, TOKEN_ADDRESS } from '@/config/token-contract';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export default function useApprove(isAllowance: boolean, totalTokenCost: number) {
  const { config } = usePrepareContractWrite({
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS,
    functionName: 'approve',
    args: [LOTTERY_ADDRESS, BigInt(totalTokenCost)],
    enabled: isAllowance,
  });

  const { data, write: approveTokens, isLoading: isApproving } = useContractWrite(config);

  const { isLoading: isApproveTxLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { approveTokens, isApproving, isApproveTxLoading };
}
