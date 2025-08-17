import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './app';

const HomepageFeature = lazy(() =>
  import('@fithelper-monorepo/homepage-feature').then((module) => ({
    default: module.HomepageFeature,
  }))
);
const IntakeFeature = lazy(() =>
  import('@fithelper-monorepo/intake-feature').then((module) => ({
    default: module.IntakeFeature,
  }))
);

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
        element: <IntakeFeature />,
      },
    ],
  },
]);

export default router;
