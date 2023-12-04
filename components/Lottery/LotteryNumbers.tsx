import NumberButton from './NumberButton';

export default function LotteryNumbers() {
  let ticketNumbers: number[] = [];

  for (let i = 1; i <= 50; i++) {
    ticketNumbers.push(i);
  }

  return (
    <div className='grid grid-cols-5 gap-4 sm:gap-5 md:grid-cols-10 md:gap-3 md:gap-y-4 lg:gap-5'>
      {ticketNumbers.map((number, index) => (
        <NumberButton key={index} ticketNumber={number} />
      ))}
    </div>
  );
}
