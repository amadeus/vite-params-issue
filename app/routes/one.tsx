import {memo, useEffect} from 'react';
import {useParams} from 'react-router';
import ButtonLink from './ButtonLink';
import Wrapper from './Wrapper';
import type {Route} from './+types/one';

export default memo(function RouteWrapper({params}: Route.ComponentProps) {
  useEffect(() => {
    console.log('One.RENDER:', params);
  }, [params]);
  return <Content />;
});

// Intentionally memo'd wrapper to avoid contending with default route updates
const Content = memo(() => {
  const params = useParams();
  return (
    <Wrapper title="Page 1" params={params}>
      <ButtonLink to="/">Home</ButtonLink>
      <ButtonLink to="/one/two">Page 2</ButtonLink>
    </Wrapper>
  );
});
