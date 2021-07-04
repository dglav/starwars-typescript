import { useInfiniteQuery } from 'react-query';
import { TPerson } from './types';

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

const useInfiniteQueryPeople = () => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery<TData>(
    'people',
    fetchPeople,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage
    }
  );

  return { data, status, fetchNextPage, hasNextPage };
};

export default useInfiniteQueryPeople;
