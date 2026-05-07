declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    va: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export {}; // This line is needed to make the file a module