'use client';

import useClient from '@/lib/hooks/useClient';
import useLotteryData from '@/lib/hooks/useLotteryData';
import { useTicketStore } from '@/stores/ticketStore';
import { useModalStore } from '@/stores/modalStore';
import { Badge, Button } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi2';

export default function CartButton() {
  const isClient = useClient();
  const { isLotteryOpen } = useLotteryData();
  const { toggleCartModal } = useModalStore();
  const { tickets } = useTicketStore();

  if (!isClient) {
    return (
      <div className='fixed bottom-5 right-7 z-10'>
        <Button pill size='xs' outline className='relative'>
          <HiShoppingCart className='h-7 w-7' />
          <Badge className='absolute -right-1 -top-2 rounded-full' size='xs'>
            0
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className='fixed bottom-5 right-7 z-10'>
      <Button pill size='xs' outline className='relative' disabled={!isLotteryOpen} onClick={() => toggleCartModal()}>
        <HiShoppingCart className='h-7 w-7' />
        <Badge className='absolute -right-1 -top-2 rounded-full' size='xs'>
          {tickets?.length > 0 ? tickets.length : 0}
        </Badge>
      </Button>
    </div>
  );
}
