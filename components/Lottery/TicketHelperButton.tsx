'use client';

import { autoPick } from '@/lib/utils/autoPick';
import { useTicketStore } from '@/stores/ticketStore';
import { Button } from 'flowbite-react';
import { HiArrowPath, HiShoppingCart, HiXMark } from 'react-icons/hi2';

export default function TicketHelperButton() {
  const { ticket, tickets, addTicket, addTickets, resetTicket } = useTicketStore();

  const handleAutoPick = () => {
    resetTicket();

    const minRange = 1;
    const maxRange = 50;

    const result = autoPick(minRange, maxRange, ticket.length);

    for (let i = 0; i < result.length; i++) {
      addTicket(result[i]);
    }
  };

  const handleAddToCart = () => {
    if (!ticket.includes(0)) {
      addTickets(ticket);
      resetTicket();
    }
  };

  return (
    <>
      <Button size='sm' color='failure' onClick={resetTicket}>
        Clear
        <HiXMark className='ml-2 h-5 w-5' />
      </Button>
      <Button size='sm' color='blue' onClick={handleAutoPick}>
        Auto Pick
        <HiArrowPath className='ml-2 h-5 w-5' />
      </Button>
      <Button size='sm' color='success' className='col-span-full md:col-auto' onClick={handleAddToCart}>
        Add to Cart
        <HiShoppingCart className='ml-2 h-5 w-5' />
      </Button>
    </>
  );
}
