import Core from './Core';
import Tabs from './Tabs';

export default function Lottery() {
  return (
    <div className='relative grid gap-y-10 px-4 py-16'>
      <Tabs />
      <Core />
    </div>
  );
}
