import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../dashoardHome/Home';
import SideNavbar from './components/SideNavbar';
import Journals from '../journals/Journals';
import Analysis from '../Analysis';
import Resources from '../resources/Resources';
import { Icon } from '@iconify/react';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleNav = () => {
    setMobileNav(!mobileNav);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <main className='relative flex flex-col min-h-screen lg:flex-row bg-slate-900'>
      <section
        className={`transform lg:transform-none inset-y-0 left-0 transition duration-300 ease-in-out  ${
          mobileNav ? 'translate-x-0' : '-translate-x-full'
        } z-50 lg:z-0 w-80 lg:w-[22%] xl:w-[22%] 2xl:w-[17%] h-screen fixed`}
      >
        <SideNavbar toggleNav={toggleNav} />
      </section>
      {/* Mobile */}
      <div className='block p-3 lg:hidden'>
        <div className='flex items-center justify-between'>
          <button
            onClick={toggleNav}
            className={
              !mobileNav
                ? 'z-50 flex items-center justify-center w-10 h-10 bg-slate-500 border border-gray-400 rounded-sm'
                : 'hideen'
            }
          >
            <Icon icon='formkit:open' className='w-9 h-9 text-cyan-500' />
          </button>
        </div>
      </div>

      {/* Overlay  */}

      <div
        onClick={toggleNav}
        className={`fixed inset-0 h-full z-40 flex items-end bg-slate-700 bg-opacity-75 sm:items-center sm:justify-center lg:hidden ${
          mobileNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      ></div>
      <div className='h-8' />

      <section className='lg:w-[78%] xl:w-[78%] 2xl:w-[83%] lg:ml-[22%] xl:ml-[22%] 2xl:ml-[17%] '>
        {/* <NavComponent /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/journals' element={<Journals />} />
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/resources' element={<Resources />} />
        </Routes>
      </section>
    </main>
  );
};

export default Dashboard;
