declare module 'sonner' {
    export const Toaster: React.FC;
    export const toast: {
      (message: string): void;
      success: (message: string, options?: { description?: string }) => void;
      error: (message: string, options?: { description?: string }) => void;
      warning: (message: string, options?: { description?: string }) => void;
      info: (message: string, options?: { description?: string }) => void;
    };
  }