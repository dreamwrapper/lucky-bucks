'use client';

import { Button, Card } from 'flowbite-react';
import { useState } from 'react';
import PrizesInfoModal from './PrizesInfoModal';
import useLotteryData from '@/lib/hooks/useLotteryData';
import useCountdown from '@/lib/hooks/useCountdown';
import useClient from '@/lib/hooks/useClient';

export default function Tabs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isClient = useClient();

  const { lotteryCurrentRound, lotteryTimestamp, isLotteryOpen, isDrawComplete, winningTicket } = useLotteryData();
  const { remainingTime, formatTime } = useCountdown(lotteryTimestamp !== undefined ? lotteryTimestamp : 0);

  const countdown = formatTime(remainingTime);

  const handleOnClick = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <Card className='md:mx-auto md:max-w-2xl lg:max-w-4xl'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-around'>
          <div className='mx-auto space-y-2 md:mx-0'>
            {!isLotteryOpen && isDrawComplete ? (
              <h1 className='text-xl font-bold'> {`[ ${winningTicket?.join(', ')} ]`} </h1>
            ) : (
              <h1 className='text-2xl font-bold'>Lottery - Round {isClient ? lotteryCurrentRound : 0} </h1>
            )}

            <p className='text-xl'>
              <span className='font-light'>Countdown</span> : {remainingTime > 0 ? <span>{countdown}</span> : <span className='font-bold'>CLOSED</span>}
            </p>
          </div>
          <div className='mt-7 grid gap-y-4 md:mt-0 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0'>
            <Button outline={isModalOpen ? true : false}>Pick 6 numbers</Button>
            <Button outline disabled>
              Draw History
            </Button>
            <Button outline={isModalOpen ? false : true} onClick={handleOnClick}>
              Prizes & Info
            </Button>
          </div>
        </div>
      </Card>
      <PrizesInfoModal isModalOpen={isModalOpen} onClick={setIsModalOpen} />
    </div>
  );
}
