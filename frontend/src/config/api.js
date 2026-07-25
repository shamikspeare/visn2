const configuredBackendUrl = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL
)?.trim();
const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const fallbackBackendUrl = isLocalhost
  ? 'http://localhost:5000'
  : 'https://visn2-gs56.vercel.app';

const apiBaseUrl = (configuredBackendUrl || fallbackBackendUrl).replace(/\/$/, '');

export const CONTACT_API_URL = `${apiBaseUrl}/api/contact`;
