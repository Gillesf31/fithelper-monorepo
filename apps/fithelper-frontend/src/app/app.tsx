import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-infinity text-primary w-1/12"></span>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}

export default App;
