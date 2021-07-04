import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { db } from '../firebase';
import EditPlanet from './EditPlanet';

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

type TData = TPlanet[];

const fetchSavedPlanets = async () => {
  const planetsSnapshot = await db.collection('planets').get();
  return planetsSnapshot.docs.map((planetDoc) => planetDoc.data());
};

const SavedPlanets: React.FC = () => {
  const { data, status }: UseQueryResult<TData> = useQuery(
    'savedPlanets',
    () => fetchSavedPlanets(),
    {
      staleTime: Infinity
    }
  );

  return (
    <div>
      <h2>Firestore Planets</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data?.map((planet) => {
            return <EditPlanet key={planet.name} planet={planet} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SavedPlanets;
