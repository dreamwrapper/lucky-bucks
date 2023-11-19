import { Button, CustomFlowbiteTheme, Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

export default function PrizesInfoModal({
  isModalOpen,
  onClick,
}: {
  isModalOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  const modalCustomTheme: CustomFlowbiteTheme['modal'] = {
    root: {
      show: {
        on: 'flex bg-gray-950 bg-opacity-50 dark:bg-opacity-80',
        off: 'hidden',
      },
    },
  };

  return (
    <Modal
      dismissible
      show={isModalOpen}
      onClose={() => onClick(false)}
      theme={modalCustomTheme}
    >
      <Modal.Header>Prizes & Info</Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>What is LBC Lottery?</h3>
          <p className='font-light text-gray-200'>
            LBC Lottery is a Quick Draw lottery-style game. The rules of the
            game are the same as those of the original lottery but the draw
            results are determined by a random number generator (RNG). LBC
            Lottery draws take place every weeks.
          </p>
        </div>
        <div className='mt-10'>
          <ul className='space-y-3'>
            <li className='flex justify-between text-lg'>
              <span className='font-semibold'>Prize Pool : </span>
              <span>0</span>
            </li>
            <li className='flex justify-between text-lg'>
              <span className='font-semibold'>Ticket Sold : </span>
              <span>0</span>
            </li>
            <li className='flex justify-between text-lg'>
              <span className='font-semibold'>Ticket Price : </span>
              <span>0</span>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
