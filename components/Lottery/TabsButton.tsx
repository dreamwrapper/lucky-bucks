'use client';

import { Button } from 'flowbite-react';
import { useState } from 'react';
import InfoModal from './InfoModal';
import useClient from '@/lib/hooks/useClient';

export default function TabsButton() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const isClient = useClient();

  const handleOnClick = () => setIsInfoModalOpen(!isInfoModalOpen);

  if (!isClient) {
    return (
      <div className='flex flex-col gap-y-3 lg:flex-row lg:gap-x-5'>
        <Button>Pick 6 numbers</Button>
        <Button outline disabled>
          Draw History
        </Button>
        <Button outline>Prizes & Info</Button>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-y-3 lg:flex-row lg:gap-x-5'>
        <Button outline={isInfoModalOpen ? true : false}>Pick 6 numbers</Button>
        <Button outline disabled>
          Draw History
        </Button>
        <Button outline={isInfoModalOpen ? false : true} onClick={handleOnClick}>
          Prizes & Info
        </Button>
      </div>
      <InfoModal isInfoModalOpen={isInfoModalOpen} onClick={setIsInfoModalOpen} />
    </>
  );
}
