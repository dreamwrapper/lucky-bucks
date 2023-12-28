'use client';

import { Button } from 'flowbite-react';
import useClient from '@/lib/hooks/useClient';
import { useModalStore } from '@/stores/modalStore';

export default function TabsButton() {
  const isClient = useClient();
  const { infoModal, toggleInfoModal } = useModalStore();

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
        <Button outline={infoModal ? true : false}>Pick 6 numbers</Button>
        <Button outline disabled>
          Draw History
        </Button>
        <Button outline={infoModal ? false : true} onClick={() => toggleInfoModal()}>
          Prizes & Info
        </Button>
      </div>
    </>
  );
}
