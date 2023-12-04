'use client';

import { autoPick } from '@/lib/utils/autoPick';
import { compareArrays } from '@/lib/utils/compareArrays';
import { useTicketStore } from '@/stores/ticketStore';
import { Button, TextInput } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { HiArrowRight, HiSparkles, HiTicket } from 'react-icons/hi2';

export default function GenerateTickets() {
  const [toGenerate, setToGenerate] = useState('');
  const { ticket, tickets, addTickets } = useTicketStore();

  const onGenerateChange = (event: ChangeEvent<HTMLInputElement>) => setToGenerate(event.target.value);

  const handleGenerate = (toGenerate: number) => {
    const minRange = 1;
    const maxRange = 50;

    outer: for (let h = 0; h < toGenerate; h++) {
      const result = autoPick(minRange, maxRange, ticket.length);

      for (let i = 0; i < tickets.length; i++) {
        if (compareArrays(result, tickets[i])) {
          h--;
          continue outer;
        }
      }

      addTickets(result);
    }

    setToGenerate('');
  };

  return (
    <>
      <TextInput type='text' value={toGenerate} icon={HiSparkles} rightIcon={HiArrowRight} placeholder='Number of tickets to generate' className='w-full lg:w-1/2' onChange={onGenerateChange} />
      <Button size='sm' onClick={() => handleGenerate(parseInt(toGenerate))}>
        <HiTicket className='mr-2 h-5 w-5' />
        Generate
      </Button>
    </>
  );
}
