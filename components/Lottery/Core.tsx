'use client';

import { Card } from 'flowbite-react';
import LotteryNumbers from './LotteryNumbers';
import SelectedNumbers from './SelectedNumbers';
import { useState } from 'react';
import { rng } from '@/lib/utils/rng';
import TicketCartButton from './TicketCartButton';
import TicketCartModal from './TicketCartModal';

export default function Core() {
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [addedTickets, setAddedTickets] = useState<number[][]>([]);

  const handleSelectedTickets = (selectedTicket: number) => {
    const numberIndex = selectedTickets.indexOf(selectedTicket);

    if (numberIndex !== -1) {
      const updatedNumbers = [...selectedTickets];
      updatedNumbers.splice(numberIndex, 1);
      setSelectedTickets(updatedNumbers);
    } else {
      if (selectedTickets.length === 6) {
        return;
      }
      setSelectedTickets([...selectedTickets, selectedTicket]);
    }
  };

  const handleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleAddedTickets = () => {
    if (selectedTickets && selectedTickets.length === 6) {
      setAddedTickets([...addedTickets, selectedTickets]);
      setSelectedTickets([]);
    }
  };

  const handleRemoveAddedTickets = (ticketIndex: number) => {
    const newAddedTickets = addedTickets.filter((_, index) => index !== ticketIndex);

    setAddedTickets(newAddedTickets);
  };

  const clearSelectedTickets = () => {
    setSelectedTickets([]);
  };

  const randomSelectedTickets = () => {
    const MIN_RANGE = 1;
    const MAX_RANGE = 50;
    const MAX_LENGTH = 6;

    let result: number[] = new Array(MAX_LENGTH);

    outerLoop: for (let i = 0; i < MAX_LENGTH; i++) {
      const number = rng(MIN_RANGE, MAX_RANGE);

      for (let j = 0; j < result.length; j++) {
        if (number == result[j]) {
          i--;
          continue outerLoop;
        }
      }

      result[i] = number;
    }

    setSelectedTickets(result);
  };

  return (
    <>
      <div>
        <Card className='md:mx-auto md:max-w-2xl lg:max-w-4xl'>
          <div>
            <div className='grid grid-cols-5 gap-3 md:grid-cols-10 lg:gap-x-9 lg:gap-y-4'>
              <LotteryNumbers selectedTickets={selectedTickets} onClick={handleSelectedTickets} />
            </div>
            <SelectedNumbers selectedTickets={selectedTickets} onClearSelectedTickets={clearSelectedTickets} onRandomSelectedTickets={randomSelectedTickets} handleAddedTickets={handleAddedTickets} />
          </div>
        </Card>
      </div>
      <TicketCartButton addedTickets={addedTickets} onClick={handleCartModal} />
      <TicketCartModal
        addedTickets={addedTickets}
        setAddedTickets={setAddedTickets}
        handleRemoveAddedTickets={handleRemoveAddedTickets}
        isCartModalOpen={isCartModalOpen}
        onClick={setIsCartModalOpen}
      />
    </>
  );
}
