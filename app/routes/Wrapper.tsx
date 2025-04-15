import {useEffect, useRef, type ReactNode} from 'react';

interface WrapperProps {
  title: string;
  params: any;
  children: ReactNode;
}

export default function Wrapper({title, children, params}: WrapperProps) {
  const lastParams = useRef(params);
  useEffect(() => {
    console.log(`${title} rendered, params changed:`, lastParams.current !== params, params);
    lastParams.current = params;
  });
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-4 gap-2">
      <div>
        <strong className="uppercase">{title}</strong>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">{children}</div>
    </div>
  );
}
