import clsx from 'clsx';
import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className,
}) => {
  return (
    <p className={clsx('text-xs mt-1 text-red-500', className)}>{children}</p>
  );
};
