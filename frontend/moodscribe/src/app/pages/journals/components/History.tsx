import { useEffect, useState } from 'react';
import { Accordion, Tooltip } from 'flowbite-react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../redux/store';
import {
  deleteJournal,
  getJournals,
} from '../../../../redux/journals/features';
import { Icon } from '@iconify/react/dist/iconify.js';
import { formatDate } from '../../../../utils/helpers';
import clsx from 'clsx';

const History = () => {
  const dispatch = useAppDispatch();
  const { journals } = useAppSelector((state: RootState) => state.journals);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getJournals());
  }, [dispatch]);

  const togglePanel = (id: string) => {
    setOpenPanel((prevOpenPanel) => (prevOpenPanel === id ? null : id));
  };

  const sortedJournals = [...journals.journals].sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className='my-7'>
      {journals.journals.length > 0 ? (
        sortedJournals.map((journal) => (
          <Accordion
            className='divide-cyan-800 border-cyan-800 mb-4'
            key={journal._id}
          >
            <Accordion.Panel className='flex gap-10'>
              <Accordion.Title
                className='text-white font-semibold focus:ring-2 focus:ring-cyan-600 rounded hover:bg-cyan-800 bg-transparent py-2'
                onClick={() => togglePanel(journal._id as string)}
              >
                {journal.title}
              </Accordion.Title>
              <Accordion.Content
                className={clsx(openPanel === journal._id ? 'block' : 'hidden')}
              >
                <span className='block mb-6 text-sm text-gray-300'>
                  {formatDate(journal.date as unknown as string)}
                </span>
                <p className='mb-8 dark:text-gray-400'>{journal.content}</p>
                <div className='flex items-center space-x-20'>
                  <button
                    className='py-2 px-5 text-red-500 font-semibold bg-slate-600 hover:bg-slate-700 rounded'
                    onClick={() =>
                      dispatch(deleteJournal(journal._id as string))
                    }
                  >
                    Delete
                  </button>
                  <Tooltip content={journal.mood.name} placement='top'>
                    <span className=''>Day:</span>
                    <Icon
                      icon={journal.mood.icon}
                      style={{
                        color:
                          journal.mood.name === 'Angry' ? 'red' : '#facc4c',
                      }}
                      className='w-7 h-7 inline-block ml-2'
                    />
                  </Tooltip>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))
      ) : (
        <div className='flex justify-center items-center h-96'>
          <p className='text-lg bg-gradient-to-r from-teal-100 via-amber-500 to-cyan-400 bg-clip-text text-transparent'>
            Your Journal List is empty. Create a new entry?
          </p>
        </div>
      )}
    </div>
  );
};

export default History;
