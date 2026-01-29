import { createBrowserRouter } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { AboutPage } from './pages/AboutPage';
import { ArchivePage } from './pages/ArchivePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OpenCallPage } from './pages/OpenCallPage';
import { SignUpPage } from './pages/SignUpPage';
import { SingleIssuePage } from './pages/SingleIssuePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { OrderPage } from './pages/OrderPage';
import { ErrorPage } from './pages/ErrorPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'om-oss',
        element: <AboutPage />,
      },
      {
        path: 'open-call',
        element: <OpenCallPage />,
      },
      {
        path: 'arkiv',
        element: <ArchivePage />,
      },
      {
        path: 'arkiv/:id',
        element: <SingleIssuePage />,
      },
      {
        path: 'nyhetsbrev',
        element: <SignUpPage />,
      },
      {
        path: 'beställ',
        element: <OrderPage />,
      },
      {
        path: 'integritetspolicy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
