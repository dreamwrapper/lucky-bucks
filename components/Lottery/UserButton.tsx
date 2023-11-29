import { HiUserCircle } from 'react-icons/hi2';
import { useState } from 'react';
import ConnectModal from './ConnectModal';
import useClient from '@/lib/hooks/useClient';
import { useAccount } from 'wagmi';
import UserModal from './UserModal';

export default function UserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isClient = useClient();
  const { isConnected, isDisconnected } = useAccount();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!isClient) {
    return (
      <button>
        <HiUserCircle className='h-9 w-9' />
      </button>
    );
  }

  return (
    <>
      {isConnected && (
        <>
          <button onClick={handleModal}>
            <HiUserCircle className='h-9 w-9' />
          </button>
          <UserModal isModalOpen={isModalOpen} onClick={setIsModalOpen} />
        </>
      )}

      {isDisconnected && (
        <>
          <button onClick={handleModal}>
            <HiUserCircle className='h-9 w-9' />
          </button>
          <ConnectModal isModalOpen={isModalOpen} onClick={setIsModalOpen} />
        </>
      )}
    </>
  );
}
