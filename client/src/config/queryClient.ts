import { QueryCache, QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query: any) => {
      if (query.state.status === 'error') {
        console.log(`Error: ${error.message}`);
      }
    },
  }),
});