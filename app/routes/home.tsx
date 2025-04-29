import {memo, useEffect} from 'react';
import {useParams} from 'react-router';
import ButtonLink from './ButtonLink';
import Wrapper from './Wrapper';
import type {Route} from './+types/home';

export default memo(function RouteWrapper({params}: Route.ComponentProps) {
  useEffect(() => {
    console.log('Home.RENDER:', params);
  }, [params]);
  return <Content />;
});

// Intentionally memo'd wrapper to avoid contending with default route updates
const Content = memo(() => {
  const params = useParams();
  return (
    <Wrapper title="Home Page" params={params}>
      <ButtonLink to="/one">Page 1</ButtonLink>
    </Wrapper>
  );
});
