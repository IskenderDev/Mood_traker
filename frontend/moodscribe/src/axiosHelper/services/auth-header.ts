export const authHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
  } else {
    return {};
  }
};
