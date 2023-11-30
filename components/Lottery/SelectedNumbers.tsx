import useClient from '@/lib/hooks/useClient';
import useLotteryData from '@/lib/hooks/useLotteryData';
import useLotteryStatus from '@/lib/hooks/useLotteryStatus';
import { Button } from 'flowbite-react';
import { HiArrowPath, HiChevronRight, HiXMark } from 'react-icons/hi2';

export default function SelectedNumbers({
  selectedTickets,
  onClearSelectedTickets,
  onRandomSelectedTickets,
  handleAddedTickets,
}: {
  selectedTickets: number[];
  onClearSelectedTickets: () => void;
  onRandomSelectedTickets: () => void;
  handleAddedTickets: () => void;
}) {
  const isClient = useClient();
  const { isLotteryOpen } = useLotteryData();

  if (!isClient) {
    return (
      <div className='mt-10 md:rounded-lg md:border md:border-gray-700 md:p-7'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-evenly'>
          <h2 className='text-center text-xl font-semibold'>Selected Numbers :</h2>

          <p className='mt-5 text-center lg:mt-0'>Please pick a numbers!</p>
        </div>
        <div className='flex flex-col lg:mt-10 lg:flex-row lg:items-center lg:justify-evenly'>
          <div className='mt-8 flex justify-evenly md:justify-center md:gap-x-6 lg:mt-0'>
            <Button color='failure' pill>
              Clear
              <HiXMark className='ml-3 h-4 w-4' />
            </Button>
            <Button pill color='blue'>
              Auto Pick
              <HiArrowPath className='ml-3 h-4 w-4' />
            </Button>
          </div>
          <div className='mt-7 lg:mt-0'>
            <Button pill className='mx-auto' color='success'>
              Add ticket to cart
              <HiChevronRight className='ml-3 h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-10 md:rounded-lg md:border md:border-gray-700 md:p-7'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-evenly'>
        <h2 className='text-center text-xl font-semibold'>Selected Numbers :</h2>

        {selectedTickets.length ? (
          <div className='mt-7 grid grid-cols-6 gap-3 md:mx-auto md:max-w-sm lg:mx-0 lg:mt-0'>
            {selectedTickets.map((num, i) => (
              <Button pill key={i} size='sm'>
                {num}
              </Button>
            ))}
          </div>
        ) : (
          <p className='mt-5 text-center lg:mt-0'>Please pick a numbers!</p>
        )}
      </div>
      <div className='flex flex-col lg:mt-10 lg:flex-row lg:items-center lg:justify-evenly'>
        <div className='mt-8 flex justify-evenly md:justify-center md:gap-x-6 lg:mt-0'>
          <Button color='failure' pill onClick={onClearSelectedTickets}>
            Clear
            <HiXMark className='ml-3 h-4 w-4' />
          </Button>
          <Button pill color='blue' onClick={onRandomSelectedTickets}>
            Auto Pick
            <HiArrowPath className='ml-3 h-4 w-4' />
          </Button>
        </div>
        <div className='mt-7 lg:mt-0'>
          <Button pill className='mx-auto' color='success' onClick={handleAddedTickets} disabled={!isLotteryOpen}>
            Add ticket to cart
            <HiChevronRight className='ml-3 h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
