import { Dropdown } from 'flowbite-react';
import { HiTableCells, HiUser, HiUserCircle } from 'react-icons/hi2';
import { HiLogout } from 'react-icons/hi';
import { useState } from 'react';
import ConnectModal from './ConnectModal';
import useClient from '@/lib/hooks/useClient';
import useMetamask from '@/lib/hooks/useMetamask';

export default function UserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isClient = useClient();
  const { address } = useMetamask();

  const handleConnectModal = () => {
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
      {isClient && address && (
        <Dropdown
          label=''
          renderTrigger={() => (
            <button>
              <HiUserCircle className='h-9 w-9' />
            </button>
          )}
        >
          <Dropdown.Header>
            <span className='block text-sm'>Anonymous</span>
            <span className='block truncate text-sm font-medium'>
              {address?.substring(0, 8)}
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiUser}>Profile</Dropdown.Item>
          <Dropdown.Item icon={HiTableCells}>History</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout}>Disconnect</Dropdown.Item>
        </Dropdown>
      )}

      {isClient && !address && (
        <>
          <button onClick={handleConnectModal}>
            <HiUserCircle className='h-9 w-9' />
          </button>
          <ConnectModal isModalOpen={isModalOpen} onClick={setIsModalOpen} />
        </>
      )}
    </>
  );
}
