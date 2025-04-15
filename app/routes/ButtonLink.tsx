import {Link} from 'react-router';

interface ButtonLinkProps {
  to: string;
  children: string;
}
export default function ButtonLink({to, children}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className="bg-blue-500 text-white inline-block pl-2 pr-2 rounded-md"
      onMouseDown={() => console.log(`Mouse down on ${children} link`)}>
      {children}
    </Link>
  );
}
