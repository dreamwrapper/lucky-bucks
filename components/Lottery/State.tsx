'use client';

import useClient from '@/lib/hooks/useClient';
import useCountdown from '@/lib/hooks/useCountdown';
import { useLbcLotteryDrawResult, useLbcLotteryIsLotteryDrawComplete, useLbcLotteryIsLotteryOpen, useLbcLotteryLotteryTimestamp, useLbcLotteryRound } from '@/generated';

export default function State() {
  const isClient = useClient();

  const { data: lotteryRound } = useLbcLotteryRound({ watch: true });
  const { data: winningTicket } = useLbcLotteryDrawResult({ watch: true });
  const { data: isLotteryOpen } = useLbcLotteryIsLotteryOpen({ watch: true });
  const { data: lotteryTimestamp } = useLbcLotteryLotteryTimestamp({ watch: true });
  const { data: isDrawComplete } = useLbcLotteryIsLotteryDrawComplete({ watch: true });

  const { remainingTime, formatTime } = useCountdown(lotteryTimestamp ?? 0);
  const countdown = formatTime(remainingTime);

  if (!isClient) {
    return (
      <div className='flex flex-col items-center gap-y-2 md:items-start'>
        <h1 className='text-3xl font-semibold'>Lottery - Round 0</h1>
        <p className='text-xl font-light'>
          Countdown : <span className='font-medium'>0d:0h:0m:0s</span>
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-y-2 md:items-start'>
      {!isLotteryOpen && isDrawComplete ? (
        <h1 className='text-xl font-semibold'> {`[ ${winningTicket?.join(', ')} ]`} </h1>
      ) : (
        <h1 className='text-3xl font-semibold'>Lottery - Round {lotteryRound} </h1>
      )}
      <p className='text-xl font-light'>
        Countdown :<span className='font-medium'> {isLotteryOpen ? countdown : 'CLOSED'}</span>
      </p>
    </div>
  );
}
