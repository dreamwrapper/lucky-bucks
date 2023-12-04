'use client';

import { useTicketStore } from '@/stores/ticketStore';
import { Button } from 'flowbite-react';

export default function NumberButton({ ticketNumber }: { ticketNumber: number }) {
  const { ticket, addTicket, removeTicket } = useTicketStore();

  const handleTicketNumber = (ticketNumber: number) => {
    const hasZero = ticket.includes(0);
    const hasNumber = ticket.includes(ticketNumber);
    const numberIndex = ticket.indexOf(ticketNumber);

    if (hasZero && !hasNumber) {
      addTicket(ticketNumber);
    } else if (hasNumber) {
      removeTicket(numberIndex);
    }
  };

  return (
    <Button pill onClick={() => handleTicketNumber(ticketNumber)} color={ticket.includes(ticketNumber) ? 'success' : undefined}>
      {ticketNumber < 10 ? `0${ticketNumber}` : ticketNumber}
    </Button>
  );
}
