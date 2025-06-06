import { FC } from 'react';
import { Route } from '../../../../utils/types';
import { Icon } from '@iconify/react';
import 'flowbite/dist/flowbite.min.css';
import { Tooltip } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../../assets/dashboard/logo-transparent.png';
import { useAppDispatch } from '../../../../redux/store';
import { signout } from '../../../../redux/auth/features';
import clsx from 'clsx';

const routes: Route[] = [
  {
    id: 1,
    name: 'Home',
    icon: 'iconoir:home',
    route: '/dashboard',
  },

  {
    id: 2,
    name: 'Journals',
    icon: 'el:livejournal',
    route: '/dashboard/journals',
  },

  {
    id: 3,
    name: 'Analysis',
    icon: 'carbon:text-link-analysis',
    route: '/dashboard/analysis',
  },

  {
    id: 4,
    name: 'Resources',
    icon: 'grommet-icons:resources',
    route: '/dashboard/resources',
  },
];
interface Props {
  toggleNav: () => void;
}

const SideNavbar: FC<Props> = ({ toggleNav }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <div>
      {' '}
      <>
        <div className='relative min-h-screen bg-slate-800 shadow-lg '>
          <div className='bg-theme py-4 lg:ml-1 max-h-[100vh] overflow-y-auto '>
            <div className='flex items-center gap-1 px-4 py-6 border-b border-slate-400'>
              <Link to='/'>
                <img src={Logo} alt='MoodScribe Logo' />
              </Link>
            </div>
            <div className='px-2 space-y-1'>
              {routes.map((navItem) => {
                const isActive = navItem.route === location.pathname;
                return (
                  <nav key={navItem.id}>
                    {navItem.route && (
                      <Link
                        to={navItem.route}
                        onClick={() => {
                          toggleNav();
                        }}
                        className={clsx(
                          'flex w-full gap-4 justify-between items-center px-2 h-12 rounded group my-3',
                          isActive
                            ? 'text-teal-100 border-r-4 border-teal-100'
                            : 'text-white'
                        )}
                      >
                        <div className='flex items-center w-full gap-2 p-3 rounded-sm group-hover:text-slate-800 hover:bg-slate-300'>
                          <div className='w-9 h-9 font-medium flex items-center justify-center text-lg'>
                            <Icon
                              icon={navItem.icon}
                              className='w-5 h-5 group-hover:text-primary-500'
                            />
                          </div>
                          <p className='font-medium text-left'>
                            {navItem.name}
                          </p>
                        </div>
                      </Link>
                    )}
                  </nav>
                );
              })}
            </div>
          </div>
          <div
            className='tooltip flex items-end px-9 h-96'
            onClick={() => dispatch(signout())}
          >
            <Tooltip content='Logout' placement='top'>
              <button
                type='button'
                className='text-white bg-cyan-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <Icon icon='tabler:logout' className='text-white w-7 h-7' />
              </button>
            </Tooltip>
          </div>
        </div>
      </>
    </div>
  );
};

export default SideNavbar;
