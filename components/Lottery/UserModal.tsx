import useUserData from '@/lib/hooks/useUserData';
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { Button, Card, CustomFlowbiteTheme, Dropdown, Label, Modal, Pagination, Select, Spinner } from 'flowbite-react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { HiUserCircle, HiXMark } from 'react-icons/hi2';
import { useAccount, useWaitForTransaction } from 'wagmi';
import numeral from 'numeral';
import useClaimTokens from '@/lib/hooks/useClaimTokens';
import useLotteryData from '@/lib/hooks/useLotteryData';
import { rng } from '@/lib/utils/rng';
import useLotteryDraw from '@/lib/hooks/useLotteryDraw';

interface UserTicket {
  ticket: number[];
}

type UserOwnedTickets = UserTicket[] | undefined;

function Tickets({ userOwnedTickets }: { userOwnedTickets: UserOwnedTickets }) {
  return (
    <div className={`min-h-full ${userOwnedTickets?.length && 'space-y-8'}`}>
      <h3 className='text-center text-lg font-semibold'>Your Tickets</h3>

      {userOwnedTickets?.length ? (
        <ul className='max-h-[160px] space-y-3 overflow-y-auto scrollbar-hide md:max-h-[348px]'>
          {userOwnedTickets?.map((tickets, i) => (
            <li key={i} className='flex justify-between'>
              <span>{i + 1}.</span>

              {tickets.ticket.map((ticket, j) => (
                <span className='lining-nums' key={j}>
                  {Number(ticket) < 10 ? `0${Number(ticket)}` : Number(ticket)}
                </span>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <p className='text-center'>Ooops! You don&apos;t have any tickets here...</p>
        </div>
      )}
    </div>
  );
}

function UserTickets({ onClick }: { onClick: Dispatch<SetStateAction<boolean>> }) {
  const [ticketIndex, setTicketIndex] = useState(-1);

  const { owner, lotteryCurrentRound, ticketSold, isDrawComplete, isLotteryOpen } = useLotteryData();

  const [lotteryRoundIndex, setlotteryRoundIndex] = useState<number>(Number(lotteryCurrentRound) - 1);

  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();

  const { userLotteryData, userTokenBalances, userOwnedTickets } = useUserData(lotteryRoundIndex);

  const [isWinner = false, isClaimed = false, totalSpent = 0, claimableTokens = 0] = userLotteryData ?? [];

  const { write, isClaimTokensLoading, isTxStateLoading } = useClaimTokens(lotteryRoundIndex, isWinner, isClaimed);

  const formattedBalances = numeral(userTokenBalances?.toString().slice(0, 18)).format('0,0 a');

  const allLotteryRounds = Array.from({ length: Number(lotteryCurrentRound) }, (_, index) => index);

  const { drawLottery, isDrawing, isDrawTxLoading } = useLotteryDraw(ticketIndex);

  const handleLotteryDraw = () => {
    const MIN_RANGE = 0;
    const MAX_RANGE = ticketSold !== undefined ? ticketSold - 1 : 0;

    const winningTicketIndex = rng(MIN_RANGE, MAX_RANGE);

    setTicketIndex(winningTicketIndex);
  };

  useEffect(() => {
    if (ticketIndex > -1) {
      drawLottery?.();
    }
  }, [ticketIndex, drawLottery]);

  console.log(ticketIndex);

  return (
    <div className='grid gap-y-3 md:grid-cols-2 md:gap-x-7'>
      <Card className=''>
        <div className='ml-auto'>
          <button onClick={() => onClick(false)}>
            <HiXMark className='h-7 w-7' />
          </button>
        </div>
        <div className='space-y-7'>
          <div className='flex flex-col items-center'>
            {/* <HiUserCircle className='mb-3 h-14 w-14' /> */}
            <h3 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{address === owner ? 'Owner' : 'User'}</h3>
            <span className='text-sm text-gray-500 dark:text-gray-400'>{address?.substring(0, 10)}</span>
            <div className='mt-4 flex space-x-3 lg:mt-6'>
              {address === owner ? (
                <Button color='success' disabled={isLotteryOpen || isDrawComplete || isDrawing || isDrawTxLoading} onClick={handleLotteryDraw}>
                  {isDrawing || isDrawTxLoading ? (
                    <>
                      Please Wait <Spinner size='sm' className='ml-3' />
                    </>
                  ) : (
                    'Draw Lottery'
                  )}
                </Button>
              ) : (
                <Button color='success' disabled={!isWinner || isClaimed || isClaimTokensLoading || isTxStateLoading} onClick={() => write?.()}>
                  Claim Tokens
                </Button>
              )}

              <Button color='dark' onClick={openAccountModal}>
                Wallet
              </Button>
            </div>
          </div>

          <div className='max-w-md'>
            <div className='mb-2 block'>
              <Label htmlFor='rounds' value='Select lottery round' />
            </div>
            <Select id='rounds' value={lotteryRoundIndex} onChange={(e) => setlotteryRoundIndex(parseInt(e.target.value, 10))}>
              {allLotteryRounds.map((round) => (
                <option key={round} value={round}>
                  Round {round + 1}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <ul className='space-y-4'>
              <li className='flex justify-between'>
                <span className='font-light'>Spent: </span>
                <span>{totalSpent.toLocaleString()} LBC</span>
              </li>
              <li className='flex justify-between'>
                <span className='font-light'>Balance: </span>
                <span>{formattedBalances} LBC</span>
              </li>
              <li className='flex justify-between'>
                <span className='font-light'>Claimable: </span>
                <span>{claimableTokens.toLocaleString()} LBC</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <Card>
        <Tickets userOwnedTickets={userOwnedTickets as UserOwnedTickets} />
      </Card>
    </div>
  );
}

export default function UserModal({ isModalOpen, onClick }: { isModalOpen: boolean; onClick: Dispatch<SetStateAction<boolean>> }) {
  const customModalTheme: CustomFlowbiteTheme['modal'] = {
    content: {
      base: 'relative h-full w-full p-4 md:h-auto',
      inner: 'relative rounded-lg bg-white shadow bg-transparent dark:bg-gray-800 flex flex-col max-h-[90vh]',
    },
    body: {
      base: 'p-6 flex-1 overflow-auto scrollbar-hide',
      popup: 'pt-0',
    },
  };

  return (
    <>
      <Modal dismissible show={isModalOpen} onClose={() => onClick(false)} size='3xl' theme={customModalTheme}>
        <Modal.Body>
          <div>
            <UserTickets onClick={onClick} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
