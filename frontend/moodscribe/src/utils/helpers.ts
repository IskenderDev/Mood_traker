export const isTokenExpired = (_token: string): boolean => {
  const expiration = localStorage.getItem('expirationTime');
  if (!expiration) return true;
  const currentTime = Date.now() / 1000;
  return parseInt(expiration) < currentTime;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
};
