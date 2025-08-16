import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from './app';

const HomepageFeature = lazy(() => 
  import('@fithelper-monorepo/homepage-feature').then(module => ({
    default: module.HomepageFeature
  }))
);
const IntakePage = lazy(() => import('../pages/IntakePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomepageFeature />,
      },
      {
        path: '/intake',
        element: <IntakePage />,
      },
    ],
  },
]);

export default router;
