'use client';

import { useTicketStore } from '@/stores/ticketStore';
import { Button } from 'flowbite-react';

export default function SelectedTicket() {
  const ticket = useTicketStore((state) => state.ticket);

  return (
    <div className='grid grid-cols-6 gap-x-3 sm:gap-4'>
      {ticket.map((ticketNumber, index) => (
        <Button pill key={index} size='sm' disabled={ticketNumber === 0}>
          {ticketNumber < 10 ? `0${ticketNumber}` : ticketNumber}
        </Button>
      ))}
    </div>
  );
}
