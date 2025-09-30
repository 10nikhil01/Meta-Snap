export const getSiteUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side fallback
    return window.location.origin;
  }

  // Server-side
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? 'http://localhost:3000' : 'https://www.metasnap.app';
};