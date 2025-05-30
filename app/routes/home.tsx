import {memo} from 'react';
import {useParams} from 'react-router';
import ButtonLink from './ButtonLink';
import Wrapper from './Wrapper';

export default function RouteWrapper() {
  return <Content />;
}

// Intentionally memo'd wrapper to avoid contending with default route updates
const Content = memo(() => {
  const params = useParams();
  return (
    <Wrapper title="Home Page" params={params}>
      <ButtonLink to="/one">Page 1</ButtonLink>
    </Wrapper>
  );
});
