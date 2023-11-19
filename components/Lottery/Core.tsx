import { Button } from 'flowbite-react';
import { HiArrowPath, HiChevronRight, HiXMark } from 'react-icons/hi2';

function SelectedNumber() {
  let nums: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <div className='mt-10 md:rounded-lg md:border md:border-gray-700 md:p-7'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-evenly'>
        <h2 className='text-center text-xl font-semibold'>
          Selected Numbers :
        </h2>
        <div className='mt-7 grid grid-cols-6 gap-3 md:mx-auto md:max-w-sm lg:mx-0 lg:mt-0'>
          {nums.map((num, i) => (
            <Button pill key={i} size='sm'>
              {num}
            </Button>
          ))}
        </div>
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
            Purchase Tickets
            <HiChevronRight className='ml-3 h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}

function LotteryNumber() {
  let nums: number[] = [];

  let i;

  for (i = 1; i <= 50; i++) {
    nums.push(i);
  }

  return nums.map((num, i) => (
    <Button outline key={i} pill>
      {num}
    </Button>
  ));
}

export default function Core() {
  return (
    <div>
      <div className='grid grid-cols-5 gap-3 md:grid-cols-10 lg:gap-x-6 lg:gap-y-3'>
        <LotteryNumber />
      </div>
      <SelectedNumber />
    </div>
  );
}
