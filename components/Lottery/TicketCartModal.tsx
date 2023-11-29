import useAllowances from '@/lib/hooks/useAllowances';
import useApprove from '@/lib/hooks/useApprove';
import useLotteryData from '@/lib/hooks/useLotteryData';
import useLotteryStatus from '@/lib/hooks/useLotteryStatus';
import usePurchase from '@/lib/hooks/usePurchase';
import { Button, CustomFlowbiteTheme, Modal, Tooltip } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';
import { HiMinus, HiShoppingCart, HiXMark } from 'react-icons/hi2';

export default function TicketCartModal({
  addedTickets,
  handleRemoveAddedTickets,
  isCartModalOpen,
  onClick,
}: {
  addedTickets: number[][];
  handleRemoveAddedTickets: (ticketIndex: number) => void;
  isCartModalOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  const customModalTheme: CustomFlowbiteTheme['modal'] = {
    content: {
      base: 'relative h-full w-full p-4 md:h-auto',
      inner: 'relative rounded-lg bg-white shadow dark:bg-gray-800 flex flex-col max-h-[90vh]',
    },
    body: {
      base: 'p-6 flex-1 overflow-auto scrollbar-hide',
      popup: 'pt-0',
    },
  };

  const isTicketsAdded = addedTickets.length ? true : false;

  const isLotteryOpen = useLotteryStatus();
  const { ticketPrice } = useLotteryData();
  const { allowances } = useAllowances(isTicketsAdded);

  const totalTokenCost = ticketPrice !== undefined ? addedTickets.length * ticketPrice * 10 ** 18 : 0;
  const isAllowance = allowances !== undefined ? Number(allowances) < totalTokenCost : false;

  const { approveTokens, isApproving, isApproveTxLoading } = useApprove(isAllowance, totalTokenCost);
  const { purchase, isPurchasing, isPurchaseTxLoading } = usePurchase(allowances, addedTickets as [[number, number, number, number, number, number]]);

  console.log('allowances: ', allowances);
  console.log('isLotteryOpen: ', isLotteryOpen);
  console.log('isAllowance: ', isAllowance);

  return (
    <Modal dismissible show={isCartModalOpen} size='xl' onClose={() => onClick(false)} theme={customModalTheme} className='scrollbar-hide'>
      <Modal.Header>
        <div className='flex items-center gap-x-2'>
          <HiShoppingCart className='h-7 w-7' />
          Tickets Cart
        </div>
      </Modal.Header>
      <Modal.Body>
        {addedTickets.length ? (
          <>
            <div>
              <ul className='space-y-6'>
                {addedTickets.map((tickets, i) => (
                  <div key={i} className='flex items-center justify-between'>
                    <li className='flex items-center gap-x-7 rounded-lg border border-gray-700 p-3 md:px-5'>
                      <span> {i + 1}. </span>

                      <div className='grid grid-cols-3 gap-x-3 gap-y-4 md:flex md:grid-cols-none'>
                        {tickets.map((ticket, j) => (
                          <Button pill size='sm' key={j}>
                            {ticket < 10 ? `0${ticket}` : ticket}
                          </Button>
                        ))}
                      </div>
                    </li>
                    <Tooltip content='Remove'>
                      <Button color='failure' size='xs' onClick={() => handleRemoveAddedTickets(i)}>
                        <HiMinus className='h-5 w-5' />
                      </Button>
                    </Tooltip>
                  </div>
                ))}
              </ul>
            </div>
            <div className='mt-10 grid max-w-sm grid-cols-2 gap-x-5 md:mx-auto'>
              <Button color='blue' disabled={!isAllowance || isApproving || isApproveTxLoading} onClick={() => approveTokens?.()}>
                Approve
              </Button>
              <Button color='success' disabled={isAllowance || isPurchasing || isPurchaseTxLoading} onClick={() => purchase?.()}>
                Purchase
              </Button>
            </div>
            <p className='mt-5 text-center'>
              Total Cost: <span className='font-semibold'>1,000,000 LBC</span>
            </p>
          </>
        ) : (
          <p>No tickets in this cart. Choose your numbers and add the tickets here :)</p>
        )}
      </Modal.Body>
    </Modal>
  );
}