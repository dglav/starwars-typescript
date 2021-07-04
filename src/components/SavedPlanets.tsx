import React from 'react';
import useQuerySavedPlanets from '../hooks/firestore/useQuerySavedPlanets';
import EditPlanet from './EditPlanet';

const SavedPlanets: React.FC = () => {
  const { data, status } = useQuerySavedPlanets();

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
