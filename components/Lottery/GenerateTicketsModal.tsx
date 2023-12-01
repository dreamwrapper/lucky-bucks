import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiHandThumbUp, HiSparkles, HiTicket } from 'react-icons/hi2';

export default function GenerateTicketsModal({
  generateTicketsModal,
  setGenerateTicketsModal,
  generateTickets,
  addedTickets,
}: {
  generateTicketsModal: boolean;
  setGenerateTicketsModal: Dispatch<SetStateAction<boolean>>;
  generateTickets: (toGenerate: number) => void;
  addedTickets: number[][];
}) {
  const [ticketAmounts, setTicketAmounts] = useState(-1);
  const [isGenerated, setIsGenerated] = useState(false);

  const onTicketAmountsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketAmounts(Number(e.target.value));
  };

  const onModalClose = () => {
    setGenerateTicketsModal(false);
    setIsGenerated(false);
  };

  const handleGenerateTickets = () => {
    if (ticketAmounts < 0) {
      return;
    }

    generateTickets(ticketAmounts);
  };

  useEffect(() => {
    if (addedTickets.length === ticketAmounts) {
      setIsGenerated(true);
    }
  }, [ticketAmounts, addedTickets.length]);

  return (
    <Modal dismissible show={generateTicketsModal} size='md' onClose={onModalClose}>
      <Modal.Header>
        <div className='flex items-center gap-x-2'>
          <HiTicket className='h-7 w-7' />
          Generate Tickets
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            <span className='font-bold'>Disclaimer: </span> Tickets generated will not contain duplicate ticket numbers and duplicate tickets you already purchased or in the cart.
          </p>

          <div className='mt-5 grid gap-y-5'>
            <TextInput type='text' icon={HiSparkles} onChange={onTicketAmountsChange} placeholder='Number of tickets to generate' required />
            {isGenerated && ticketAmounts !== 0 && (
              <Alert color='success' icon={HiHandThumbUp} onDismiss={() => setIsGenerated(false)}>
                <span> {ticketAmounts} Tickets generated</span>
              </Alert>
            )}
            <Button onClick={handleGenerateTickets}>Generate Tickets</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
