import { Outlet } from 'react-router-dom';
import Header from '../organisms/Header/Header';
import Footer from '../organisms/Footer/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
