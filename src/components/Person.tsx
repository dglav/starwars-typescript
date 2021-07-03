import React from 'react';
import { TPerson } from './People';

interface IPerson {
  person: TPerson;
}

const Person: React.FC<IPerson> = ({ person }) => {
  return (
    <div className="card">
      <h3>{person.name}</h3>
      <p>Height - {person.height}cm</p>
      <p>Mass - {person.mass}kg</p>
    </div>
  );
};

export default Person;
