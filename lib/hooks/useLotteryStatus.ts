import { useBlockNumber, usePublicClient } from 'wagmi';
import useLotteryData from './useLotteryData';
import { useEffect, useState } from 'react';

export default function useLotteryStatus() {
  const [blockTimestamp, setBlockTimestamp] = useState<bigint>(BigInt(0));

  const { lotteryTimestamp } = useLotteryData();
  const publicClient = usePublicClient();

  useEffect(() => {
    publicClient.getBlock().then((block) => setBlockTimestamp(block.timestamp));
  }, [blockTimestamp]);

  const isLotteryOpen = lotteryTimestamp !== undefined ? lotteryTimestamp > blockTimestamp : false;

  return isLotteryOpen;
}
