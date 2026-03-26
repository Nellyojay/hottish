import { Outlet } from 'react-router';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';

export default function Root() {
  const { theme } = useApp();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}