import { useEffect, useState } from 'react';
import History from './components/History';
import NewEntry from './components/NewEntry';
import clsx from 'clsx';
import { getUser } from '../../../redux/auth/features';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const Journals = () => {
  const dispatch = useAppDispatch();
  const [newEntry, setNewEntry] = useState(false);
  const [history, setHistory] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const firstName = user?.fullName.split(' ')[0];
  const firstNameToCaps =
    firstName && firstName[0].toUpperCase() + firstName.slice(1);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleNewEntry = () => {
    setNewEntry(true);
    setHistory(false);
  };

  const handleHistory = () => {
    setHistory(true);
    setNewEntry(false);
  };

  return (
    <section className='container mx-auto max-w-2xl px-4 md:py-14 py-10 h-full text-white'>
      <h1 className='text-2xl text-center'>
        Hello {firstNameToCaps}. Welcome to your journal
      </h1>
      <div className='flex space-x-6 mt-16 font-bold'>
        <span
          className={clsx(
            'cursor-pointer pb-2',
            newEntry ? 'text-teal-100 border-b-2 border-teal-100' : ''
          )}
          onClick={handleNewEntry}
        >
          New Entry
        </span>
        <span
          className={clsx(
            'cursor-pointer pb-2',
            history ? 'text-teal-100 border-b-2 border-teal-100' : ''
          )}
          onClick={handleHistory}
        >
          History
        </span>
      </div>
      {newEntry ? <NewEntry /> : <History />}
    </section>
  );
};

export default Journals;
