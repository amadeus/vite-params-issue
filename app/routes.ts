import {type RouteConfig, index, route} from '@react-router/dev/routes';

export default [
  // routes
  index('routes/home.tsx'),
  route(':one', 'routes/one.tsx'),
  route(':one/:two', 'routes/two.tsx'),
] satisfies RouteConfig;
