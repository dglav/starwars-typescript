import React from 'react';
import { TPlanet } from './Planets';

interface IPlanet {
  planet: TPlanet;
}

const Planet: React.FC<IPlanet> = ({ planet }) => {
  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <p>Population - {planet.population}</p>
      <p>Terrain - {planet.terrain}</p>
      <p>Climate - {planet.climate}</p>
    </div>
  );
};

export default Planet;
