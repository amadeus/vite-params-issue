import {type RouteConfig, index, route} from '@react-router/dev/routes';

export default [
  // routes
  index('routes/home.tsx'),
  route(':ref', 'routes/one.tsx'),
] satisfies RouteConfig;
