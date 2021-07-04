import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import SavedPlanets from './components/SavedPlanets';

const queryClient = new QueryClient();

export type TPageState = 'planets' | 'savedPlanets' | 'people';

function App() {
  const [page, setPage] = useState<TPageState>('planets');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === 'planets' && <Planets />}
          {page === 'savedPlanets' && <SavedPlanets />}
          {page === 'people' && <People />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
