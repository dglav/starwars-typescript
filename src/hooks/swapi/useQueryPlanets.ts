import { useState, useEffect } from 'react';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { TPlanet } from './types';

type TData = {
  results: TPlanet[];
  count: number;
  next: string;
  previous: string;
};

const fetchPlanets = async (page: number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const useQueryPlanets = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const { data, status, isPreviousData }: UseQueryResult<TData> = useQuery(
    ['planets', page],
    () => fetchPlanets(page),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(['planets', page + 1], () =>
        fetchPlanets(page + 1)
      );
    }
  }, [data, page, queryClient]);

  return { data, status, isPreviousData, page, setPage };
};

export default useQueryPlanets;
