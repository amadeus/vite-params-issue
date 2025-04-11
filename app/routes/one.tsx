import {memo} from 'react';
import {Link, useParams} from 'react-router';

export default function Route() {
  return <One />;
}

const One = memo(() => {
  const params = useParams();
  console.log('ZZZZZZ - One.params', params);
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-4">
      <div>Page One</div>
      <div>
        <Link to="/" className="text-blue-500">
          Home
        </Link>
      </div>
    </div>
  );
});
