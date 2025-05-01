declare module 'next-pwa' {
  import { NextConfig } from 'next';
  type PWAOptions = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    [key: string]: unknown;
  };
  type WithPWA = (config: NextConfig & { pwa?: PWAOptions }) => NextConfig;
  const withPWA: WithPWA;
  export default withPWA;
}
