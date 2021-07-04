import React, { useState } from 'react';
import useMutatePlanet from '../hooks/firestore/useMutatePlanet';
import { TPlanet } from '../hooks/firestore/types';

interface IPlanet {
  planet: TPlanet;
}

const EditPlanet: React.FC<IPlanet> = ({ planet }) => {
  const mutation = useMutatePlanet();
  const [planetOnEdit, setPlanetOnEdit] = useState<TPlanet>(planet);

  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <form>
        <label htmlFor={`${planet.name}_population`}>
          Population: {planet.population}
        </label>
        <input
          id={`${planet.name}_population`}
          type="number"
          value={planetOnEdit.population}
          onChange={(updatedPopulation) => {
            setPlanetOnEdit((planetOnEdit) => ({
              ...planetOnEdit,
              population: updatedPopulation.target.value
            }));
          }}
        />
        <label htmlFor={`${planet.name}_terrain`}>
          Terrain: {planet.terrain}
        </label>
        <input
          id={`${planet.name}_terrain`}
          value={planetOnEdit.terrain}
          onChange={(updatedTerrain) => {
            setPlanetOnEdit((planetOnEdit) => ({
              ...planetOnEdit,
              terrain: updatedTerrain.target.value
            }));
          }}
        />
        <label htmlFor={`${planet.name}_climate`}>
          Climate: {planet.climate}
        </label>
        <input
          id={`${planet.name}_climate`}
          value={planetOnEdit.climate}
          onChange={(updatedClimate) => {
            setPlanetOnEdit((planetOnEdit) => ({
              ...planetOnEdit,
              climate: updatedClimate.target.value
            }));
          }}
        />
      </form>
      <button onClick={() => mutation.mutate(planetOnEdit)}>
        Save to database
      </button>
    </div>
  );
};

export default EditPlanet;
