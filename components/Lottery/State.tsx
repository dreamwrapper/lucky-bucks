'use client';

import useClient from '@/lib/hooks/useClient';
import { useLbcLotteryDrawResult, useLbcLotteryIsLotteryDrawComplete, useLbcLotteryIsLotteryOpen, useLbcLotteryLotteryTimestamp, useLbcLotteryRound } from '@/generated';
import Countdown from 'react-countdown';

export default function State() {
  const isClient = useClient();

  const { data: lotteryRound } = useLbcLotteryRound({ watch: true });
  const { data: winningTicket } = useLbcLotteryDrawResult({ watch: true });
  const { data: isLotteryOpen } = useLbcLotteryIsLotteryOpen({ watch: true });
  const { data: lotteryTimestamp } = useLbcLotteryLotteryTimestamp({ watch: true });
  const { data: isDrawComplete } = useLbcLotteryIsLotteryDrawComplete({ watch: true });

  if (!isClient) {
    return (
      <div className='flex flex-col items-center gap-y-2 md:items-start'>
        <h1 className='text-3xl font-semibold'>Lottery - Round 0</h1>
        <p className='text-xl font-light'>
          Countdown : <span className='font-medium'>00:00:00:00</span>
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
        Countdown :
        <Countdown
          date={lotteryTimestamp! * 1000}
          renderer={({ completed, days, hours, minutes, seconds }) => {
            return <span className='font-medium'> {completed ? 'CLOSED' : `${days}:${hours}:${minutes}:${seconds}`} </span>;
          }}
        />
      </p>
    </div>
  );
}
