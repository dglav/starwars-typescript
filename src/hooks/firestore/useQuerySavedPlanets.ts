import { useQuery, UseQueryResult } from 'react-query';
import { db } from '../../firebase';
import { TPlanet } from './types';

const fetchSavedPlanets = async () => {
  const planetsSnapshot = await db.collection('planets').get();
  return planetsSnapshot.docs.map((planetDoc) => planetDoc.data());
};

type TData = TPlanet[];

const useQuerySavedPlanets = () => {
  const { data, status }: UseQueryResult<TData> = useQuery(
    'savedPlanets',
    () => fetchSavedPlanets(),
    {
      staleTime: Infinity
    }
  );

  return { data, status };
};

export default useQuerySavedPlanets;
