import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
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
};

const fetchPlanets = async () => {
  const res = await fetch(`https://swapi.dev/api/planets/`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const Planets: React.FC = () => {
  const { data, status }: UseQueryResult<TData> = useQuery(
    'planets',
    fetchPlanets
  );

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data?.results.map((planet) => {
            return <Planet key={planet.name} planet={planet} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Planets;
