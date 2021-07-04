import { useMutation, useQueryClient } from 'react-query';
import { db } from '../../firebase';
import { TPlanet } from './types';

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

const useMutatePlanet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    TPlanet,
    TPlanet,
    TPlanet,
    { previouslySavedPlanets: TPlanet[] }
  >(setPlanetDoc, {
    onMutate: (planet) => {
      const optimisticPlanet = planet;

      const previouslySavedPlanets: TPlanet[] =
        queryClient.getQueryData('savedPlanets') ?? [];

      queryClient.setQueryData(
        'savedPlanets',
        previouslySavedPlanets.map((previouslySavedPlanet) =>
          optimisticPlanet.name === previouslySavedPlanet.name
            ? optimisticPlanet
            : previouslySavedPlanet
        )
      );

      return { previouslySavedPlanets };
    },
    onError: (_, __, context) => {
      const previouslySavedPlanets = context!.previouslySavedPlanets;
      console.log({ previouslySavedPlanets });

      queryClient.setQueryData('savedPlanets', previouslySavedPlanets);
    },
    retry: 3
  });

  return mutation;
};

export default useMutatePlanet;
