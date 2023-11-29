import useClient from '@/lib/hooks/useClient';
import useLotteryStatus from '@/lib/hooks/useLotteryStatus';
import { Badge, Button } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi2';

export default function TicketCartButton({ addedTickets, onClick }: { addedTickets: number[][]; onClick: () => void }) {
  const isClient = useClient();
  const isLotteryOpen = useLotteryStatus();

  if (!isClient) {
    return (
      <div className='fixed bottom-5 right-7'>
        <Button pill size='xs' outline color='blue' className='relative'>
          <HiShoppingCart className='h-7 w-7' />
          <Badge className='absolute -right-1 -top-2 rounded-full' size='xs'>
            0
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className='fixed bottom-5 right-7'>
      <Button pill size='xs' outline color='blue' onClick={onClick} className='relative' disabled={!isLotteryOpen}>
        <HiShoppingCart className='h-7 w-7' />
        <Badge className='absolute -right-1 -top-2 rounded-full' size='xs'>
          {addedTickets?.length ? addedTickets.length : 0}
        </Badge>
      </Button>
    </div>
  );
}
