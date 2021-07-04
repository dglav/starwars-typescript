import React from 'react';
import { useMutation } from 'react-query';
import { db } from '../firebase';
import { TPlanet } from './Planets';

interface IPlanet {
  planet: TPlanet;
}

const setPlanetDoc = async (planet: TPlanet) => {
  const docRef = await db.collection('planets').add(planet);
  console.info('Document written with ID: ', docRef.id);
};

const Planet: React.FC<IPlanet> = ({ planet }) => {
  const mutation = useMutation(setPlanetDoc);

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
