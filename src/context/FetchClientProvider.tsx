import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

export interface FetchClient {
  // fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  fetch: (url: string, headers?: any, body?: any,) => Promise<Response>;
}

const FetchClientContext = createContext<FetchClient | null>(null);

type Props = {
  children: ReactNode;
  client: FetchClient
}

export function FetchClientProvider({ client, children }: Props) {
  return (
    <FetchClientContext.Provider value={client}>
      {children}
    </FetchClientContext.Provider>
  );
}

export function useFetchClient(): FetchClient {
  const client = useContext(FetchClientContext);
  if (!client) throw new Error('Wrap your app in FetchClientProvider');
  return client;
}