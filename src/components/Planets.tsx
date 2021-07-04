import React, { useState } from 'react';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import Planet from './Planet';

export type TPlanet = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

type TData = {
  results: TPlanet[];
  count: number;
  next: string;
  previous: string;
};

const fetchPlanets = async (page: number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const Planets: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, status, isPreviousData }: UseQueryResult<TData> = useQuery(
    ['planets', page],
    () => fetchPlanets(page),
    { keepPreviousData: true }
  );

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
