import GenerateTickets from '@/components/Lottery/GenerateTickets';
import LotteryNumbers from '@/components/Lottery/LotteryNumbers';
import SelectedTicket from '@/components/Lottery/SelectedTicket';
import State from '@/components/Lottery/State';
import TabsButton from '@/components/Lottery/TabsButton';
import CartButton from '@/components/Lottery/CartButton';
import TicketHelperButton from '@/components/Lottery/TicketHelperButton';
import { Card } from 'flowbite-react';
import CartModal from '@/components/Lottery/CartModal';
import InfoModal from '@/components/Lottery/InfoModal';
import AppBar from '@/components/Lottery/AppBar';

export default function Home() {
  return (
    <>
      <AppBar />
      <main className='relative'>
        <div className='container mx-auto grid max-w-md gap-y-10 px-4 py-16 sm:max-w-lg md:max-w-2xl lg:max-w-4xl'>
          <Card>
            <div className='flex flex-col gap-y-8 md:flex-row md:items-center md:justify-around'>
              <State />
              <TabsButton />
            </div>
          </Card>
          <Card>
            <div className='pb-4'>
              <LotteryNumbers />
              <div className='mt-7 space-y-10 md:mt-12 lg:space-y-12'>
                <div className='flex flex-col gap-y-7 md:flex-row md:items-center md:justify-between lg:justify-evenly'>
                  <h2 className='text-center text-2xl font-semibold md:text-start'>Selected Ticket :</h2>
                  <SelectedTicket />
                </div>
                <div className='flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 lg:justify-center'>
                  <GenerateTickets />
                </div>
                <div className='grid grid-cols-2 gap-5 gap-y-6 md:grid-cols-3 lg:flex lg:justify-center'>
                  <TicketHelperButton />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <InfoModal />
        <CartModal />
        <CartButton />
      </main>
    </>
  );
}
