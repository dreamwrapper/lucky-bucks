import { Button } from 'flowbite-react';

export default function LotteryNumbers({ selectedTickets, onClick }: { selectedTickets: number[]; onClick: (selectedTicket: number) => void }) {
  let nums: number[] = [];

  for (let i = 1; i <= 50; i++) {
    nums.push(i);
  }

  return nums.map((num, i) => (
    <Button key={i} pill onClick={() => onClick(i + 1)} color={selectedTickets.includes(i + 1) ? 'success' : undefined}>
      {num}
    </Button>
  ));
}
