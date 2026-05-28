import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface ProviderCallbackContextType {
  onReady?: (payload: any) => void;
}

const ProviderCallbackContext = createContext<ProviderCallbackContextType | undefined>(undefined);

export const ProviderCallback: React.FC<{
  children: ReactNode;
  onReady?: (payload: any) => void;
}> = ({ children, onReady }) => {
  return (
    <ProviderCallbackContext.Provider value={{ onReady }}>
      {children}
    </ProviderCallbackContext.Provider>
  );
};

export const useProviderCallback = () => {
  const context = useContext(ProviderCallbackContext);
  if (context === undefined) {
    throw new Error('useProviderCallback must be used within a ProviderCallback');
  }
  return context;
};
