import { AppBar } from 'components/AppBar/AppBar';
import { Suspense } from 'react'; 
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      {' '}
      {/* для того щоб AppBar не перекривав контент */}
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
