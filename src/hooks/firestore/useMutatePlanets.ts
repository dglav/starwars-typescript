import { useMutation, useQueryClient } from 'react-query';
import { db } from '../../firebase';
import { TPlanet } from './types';

const setPlanetDoc = async (planet: TPlanet) => {
  const docRef = await db.collection('planets').add(planet);
  console.info('Document written with ID: ', docRef.id);
  return planet;
};

const useMutatePlanets = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(setPlanetDoc, {
    onSuccess: (planet) => {
      const previouslySavedPlanets: TPlanet[] =
        queryClient.getQueryData('savedPlanets') ?? [];
      queryClient.setQueryData('savedPlanets', [
        ...previouslySavedPlanets,
        planet
      ]);
    }
  });

  return mutation;
};

export default useMutatePlanets;
