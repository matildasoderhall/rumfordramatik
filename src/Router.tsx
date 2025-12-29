import { createBrowserRouter } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { AboutPage } from './pages/AboutPage';
import { ArchivePage } from './pages/ArchivePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OpenCallPage } from './pages/OpenCallPage';
import { SignUpPage } from './pages/SignUpPage';
import { SingleIssuePage } from './pages/SingleIssuePage';

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
        path: 'about-us',
        element: <AboutPage />,
      },
      {
        path: 'open-call',
        element: <OpenCallPage />,
      },
      {
        path: 'archive',
        element: <ArchivePage />,
      },
      {
        path: 'archive/:id',
        element: <SingleIssuePage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
    errorElement: '', //TODO: Add default ErrorPage
  },
]);
