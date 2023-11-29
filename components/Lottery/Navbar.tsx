import { Navbar as NB } from 'flowbite-react';
import { HiBars3 } from 'react-icons/hi2';
import UserButton from './UserButton';
import Link from 'next/link';

export default function Navbar({ onClick }: { onClick: () => void }) {
  return (
    <NB fluid className='sticky top-0 z-50 border-b'>
      <div className='flex items-center gap-x-3'>
        <button onClick={onClick}>
          <HiBars3 className='h-9 w-9' />
        </button>
        <NB.Brand as={Link} href='#'>
          <span className='self-center whitespace-nowrap text-2xl font-bold dark:text-white'>
            Lucky Bucks
          </span>
        </NB.Brand>
      </div>
      <UserButton />
    </NB>
  );
}
