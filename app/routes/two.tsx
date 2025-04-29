import {memo, useEffect} from 'react';
import {useParams} from 'react-router';
import ButtonLink from './ButtonLink';
import Wrapper from './Wrapper';
import type {Route} from './+types/two';

export default memo(function RouteWrapper({params}: Route.ComponentProps) {
  useEffect(() => {
    console.log('Two.RENDER:', params);
  }, [params]);
  return <Content />;
});

// Intentionally memo'd wrapper to avoid contending with default route updates
const Content = memo(() => {
  const params = useParams();
  return (
    <Wrapper title="Page 2" params={params}>
      <ButtonLink to="/">Home</ButtonLink>
      <ButtonLink to="/one">Page 1</ButtonLink>
    </Wrapper>
  );
});
