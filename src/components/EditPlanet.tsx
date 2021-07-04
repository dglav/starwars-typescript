import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { db } from '../firebase';
import { TPlanet } from './Planets';

interface IPlanet {
  planet: TPlanet;
}

const setPlanetDoc = async (planet: TPlanet) => {
  const planetSnapshot = await db
    .collection('planets')
    .where('name', '==', planet.name)
    .get();
  if (planetSnapshot.size !== 1)
    throw Error('There is more than one planet with the same name');
  const planetId = planetSnapshot.docs.map((planetDoc) => planetDoc.id)[0];
  await db.collection('planets').doc(planetId).update(planet);
  console.info('Document updated with ID: ', planetId);
  return planet;
};

const EditPlanet: React.FC<IPlanet> = ({ planet }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(setPlanetDoc, {
    onSuccess: (data) => {
      const previouslySavedPlanets: TPlanet[] =
        queryClient.getQueryData('savedPlanets') ?? [];
      const updatedPlanet = data;
      queryClient.setQueryData(
        'savedPlanets',
        previouslySavedPlanets.map((previouslySavedPlanet) =>
          updatedPlanet.name === previouslySavedPlanet.name
            ? updatedPlanet
            : previouslySavedPlanet
        )
      );
    }
  });
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
      {!mutation.error ? (
        <>
          <button
            onClick={() => mutation.mutate(planetOnEdit)}
            disabled={mutation.isLoading}
          >
            Save to database
          </button>
        </>
      ) : (
        <button onClick={() => mutation.reset()} className="error">
          Reset because of error
        </button>
      )}
    </div>
  );
};

export default EditPlanet;
