'use client';

import useLotteryData from '@/lib/hooks/useLotteryData';
import { useModalStore } from '@/stores/modalStore';
import { CustomFlowbiteTheme, Modal } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi2';

export default function InfoModal() {
  const { infoModal, toggleInfoModal } = useModalStore();

  const modalCustomTheme: CustomFlowbiteTheme['modal'] = {
    root: {
      show: {
        on: 'flex bg-gray-950 bg-opacity-50 dark:bg-opacity-80',
        off: 'hidden',
      },
    },
  };

  const { prizePool, ticketSold, ticketPrice } = useLotteryData();

  return (
    <Modal dismissible show={infoModal} onClose={() => toggleInfoModal(false)} theme={modalCustomTheme}>
      <Modal.Header>
        <div className='flex items-center gap-x-2'>
          <HiInformationCircle className='h-7 w-7' />
          Prizes & Info
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <ul className='space-y-3'>
            <li className='flex justify-between text-lg'>
              <span>Prize Pool : </span>
              <span className='font-semibold'> {prizePool} LBC</span>
            </li>
            <li className='flex justify-between text-lg'>
              <span>Ticket Sold : </span>
              <span className='font-semibold'>
                {' '}
                {ticketSold} {ticketSold !== undefined ? (ticketSold > 1 ? 'Tickets' : 'Ticket') : ''}
              </span>
            </li>
            <li className='flex justify-between text-lg'>
              <span>Ticket Price : </span>
              <span className='font-semibold'> {ticketPrice} LBC</span>
            </li>
          </ul>
        </div>
        <div className='mt-10 space-y-4'>
          <h3 className='text-xl font-semibold'>What is LBC Lottery?</h3>
          <p className='font-light text-gray-200'>
            LBC Lottery is a Quick Draw lottery-style game. The rules of the game are the same as those of the original lottery, but the draw results are determined by a random number generator (RNG).
            LBC Lottery draws take place every week.
          </p>
        </div>
        <div className='mt-10 space-y-4'>
          <h3 className='text-xl font-semibold'>LBC Lottery Rules</h3>
          <ul className='space-y-3'>
            <li>
              <p className='text-gray-200'>1. Duplicating numbers on a ticket is not allowed</p>
            </li>
            <li>
              <p className='text-gray-200'>2. Duplicating tickets is not allowed for any user</p>
            </li>
            <li>
              <p className='text-gray-200'>3. Various users can share a common ticket</p>
            </li>
            <li>
              <p className='text-gray-200'>4. Two or more users who share the same ticket will also share the reward from the prize pool ( prizePool / totalWinner )</p>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
