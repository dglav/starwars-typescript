import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

export type TPerson = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

type TData = {
  results: TPerson[];
};

const fetchPeople = async () => {
  const res = await fetch('https://swapi.dev/api/people/');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const People: React.FC = () => {
  const { data, status } = useQuery<TData>('people', fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <div>
            {data?.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
