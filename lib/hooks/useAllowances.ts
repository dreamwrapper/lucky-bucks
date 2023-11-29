import { LOTTERY_ADDRESS } from '@/config/lottery-contract';
import { TOKEN_ABI, TOKEN_ADDRESS } from '@/config/token-contract';
import { useAccount, useContractRead } from 'wagmi';

export default function useAllowances(isTicketsAdded: boolean) {
  const { address } = useAccount();

  const { data: allowances } = useContractRead({
    watch: true,
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS,
    functionName: 'allowance',
    args: [address as `0x${string}`, LOTTERY_ADDRESS],
    enabled: isTicketsAdded,
  });

  return { allowances };
}
