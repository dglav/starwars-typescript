import React from 'react';
import { useInfiniteQuery } from 'react-query';
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
  nextPage: number;
  count: number;
  next: string;
  previous: string;
};

const fetchPeople = async ({ pageParam = 1 }) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${pageParam}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await res.json();
  return { ...json, nextPage: json.next && pageParam + 1 };
};

const People: React.FC = () => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery<TData>(
    'people',
    fetchPeople,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage
    }
  );

  console.log(`data`, data);

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <div>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((person) => (
                  <Person key={person.name} person={person} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
            Load more
          </button>
        </>
      )}
    </div>
  );
};

export default People;
