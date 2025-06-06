export const baseUrlApi =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_APP_URL
    : 'http://localhost:5000';
