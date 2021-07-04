import React from 'react';
import { TPlanet } from '../hooks/firestore/types';
import useMutatePlanets from '../hooks/firestore/useMutatePlanets';

interface IPlanet {
  planet: TPlanet;
}

const Planet: React.FC<IPlanet> = ({ planet }) => {
  const mutation = useMutatePlanets();

  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <p>Population - {planet.population}</p>
      <p>Terrain - {planet.terrain}</p>
      <p>Climate - {planet.climate}</p>
      {!mutation.error ? (
        <button
          onClick={() => mutation.mutate(planet)}
          disabled={mutation.isLoading}
        >
          Save to database
        </button>
      ) : (
        <button onClick={() => mutation.reset()} className="error">
          Reset because of error
        </button>
      )}
    </div>
  );
};

export default Planet;
