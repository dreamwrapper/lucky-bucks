import Core from './Core';
import Tabs from './Tabs';
import Wrapper from './Wrapper';

export default function Lottery() {
  return (
    <div className='grid gap-y-10 px-4 py-16'>
      <Tabs />
      <Wrapper>
        <Core />
      </Wrapper>
    </div>
  );
}
