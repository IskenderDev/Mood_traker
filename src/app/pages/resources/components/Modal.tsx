import { FC, useEffect, useRef } from 'react';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  shouldCloseOnClickOutside?: boolean;
}

export const Modal: FC<Props> = ({ showModal, closeModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, closeModal]);

  return (
    <>
      {showModal ? (
        <>
          <div className='overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div
              ref={modalRef}
              className='relative w-auto my-20 mx-auto max-w-3xl'
            >
              {/*body*/}
              <div className='relative px-4 flex-auto'>{children}</div>
            </div>
          </div>
          <div className='opacity-45 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
};
