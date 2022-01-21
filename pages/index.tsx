import type { NextPage } from 'next';
import Tree from '../components/tree';

const Home: NextPage = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-full'>
        <Tree />
      </div>
    </div>
  );
};

export default Home;
