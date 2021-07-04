import React from 'react';
import useInfiniteQueryPeople from '../hooks/swapi/useInfiniteQueryPeople';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Person from './Person';

const People: React.FC = () => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQueryPeople();

  const setContainerRef = useIntersectionObserver(() => {
    if (hasNextPage) fetchNextPage();
  }, status === 'loading');

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
          <div ref={setContainerRef}></div>
        </>
      )}
    </div>
  );
};

export default People;
