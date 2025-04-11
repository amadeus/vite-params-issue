import {Link, useParams} from 'react-router';
import type {Route} from './+types/home';
import {memo} from 'react';

export default function Route() {
  return <Home />;
}

const Home = memo(() => {
  const params = useParams();
  console.log('ZZZZZZ - Home.params', params);
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <div>The boi</div>
      <div>
        <Link to="/one" className="text-blue-500">
          To One
        </Link>
      </div>
    </main>
  );
});
