import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/logo-white.png';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { signout } from '../redux/auth/features';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const genericHamburgerLine = `h-[3px] w-7 rounded-full bg-cyan-800 transition ease transform duration-300`;

  const location = useLocation();

  const navItems = !token
    ? [
        { name: 'Journal', href: '/dashboard' },
        { name: 'Login', href: '/auth/signin' },
        { name: 'Signup', href: '/auth/signup' },
      ]
    : [
        { name: 'Journal', href: '/dashboard' },
        { name: 'Logout', href: '' },
      ];

  return (
    <header className=' absolute right-0 left-0 z-50 bg-white pl-4 md:pr-6 pr-3'>
      <div className='flex items-center justify-between h-16 py-3'>
        <Link to='/'>
          <img className='' src={logo} alt='Moodscribe logo' />
        </Link>

        <button
          className='group flex h-12 w-12 flex-col items-center justify-center md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? 'translate-y-3 rotate-45 opacity-50 group-hover:opacity-100 my-1'
                : 'opacity-50 group-hover:opacity-100 my-[3px]'
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? 'opacity-0 my-1'
                : 'opacity-50 group-hover:opacity-100 my-[3px]'
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? '-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100 my-1'
                : 'opacity-50 group-hover:opacity-100 my-[4px]'
            }`}
          />
        </button>

        <ul className='hidden items-center space-x-12 font-semibold text-cyan-800 md:flex'>
          {navItems.map((item) => {
            const isActive = item.href === location.pathname;
            return (
              <li key={item.name}>
                <Link
                  className={clsx(
                    'hover:text-cyan-600',
                    isActive && 'text-primary-100'
                  )}
                  to={item.href}
                  onClick={() => item.name === 'Logout' && dispatch(signout())}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <ul
        className={clsx(
          'text-cyan-800 my-4 items-center space-y-5 font-semibold pl-4 pt-2',
          isOpen ? 'block' : 'hidden'
        )}
      >
        {navItems.map((item, idx) => {
          const isActive = item.href === location.pathname;
          return (
            <li key={idx} onClick={() => setIsOpen(!isOpen)}>
              <Link
                className={clsx('', isActive && 'text-primary-100')}
                to={item.href}
                onClick={() => item.name === 'Logout' && dispatch(signout())}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
