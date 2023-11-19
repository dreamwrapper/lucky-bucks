import { Card } from 'flowbite-react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Card className='border-none md:mx-auto md:max-w-2xl lg:max-w-4xl'>
        {children}
      </Card>
    </div>
  );
}
