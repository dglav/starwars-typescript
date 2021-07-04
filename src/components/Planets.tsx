import React from 'react';
import useQueryPlanets from '../hooks/swapi/useQueryPlanets';
import Planet from './Planet';

const Planets: React.FC = () => {
  const { data, status, isPreviousData, page, setPage } = useQueryPlanets();

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <button
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((page) =>
                isPreviousData || !data?.next ? page : page + 1
              )
            }
            disabled={isPreviousData || !data?.next}
          >
            Next page
          </button>
          <div>
            {data?.results.map((planet) => {
              return <Planet key={planet.name} planet={planet} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
