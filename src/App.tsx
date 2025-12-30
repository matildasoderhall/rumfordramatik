import '@styles/globals.scss';
import { RouterProvider } from 'react-router';
import { appRouter } from './Router';

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
