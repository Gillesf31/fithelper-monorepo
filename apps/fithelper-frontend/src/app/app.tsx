import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Outlet />
    </Suspense>
  );
}

export default App;
