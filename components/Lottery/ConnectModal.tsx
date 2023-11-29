import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Alert, Button, Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

export default function ConnectModal({
  isModalOpen,
  onClick,
}: {
  isModalOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <Modal
        dismissible
        show={isModalOpen}
        onClose={() => onClick(false)}
        size='lg'
      >
        <Modal.Header>Connect Wallet</Modal.Header>
        <Modal.Body>
          <div>
            <Alert color='warning' rounded>
              <span className='font-medium'>Wallet is not connected!</span>{' '}
              Please connect your wallet and sign the message (if any) to
              authenticate.
            </Alert>

            <Button className='mt-5 w-full' onClick={openConnectModal}>
              Connect Wallet
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
