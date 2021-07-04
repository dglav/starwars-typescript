import React, { Dispatch, SetStateAction } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { db } from '../firebase';
import { TPageState } from '../App';

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

interface INavbar {
  setPage: Dispatch<SetStateAction<TPageState>>;
}

const Navbar: React.FC<INavbar> = ({ setPage }) => {
  const { data }: UseQueryResult<TData> = useQuery(
    'savedPlanets',
    () => fetchSavedPlanets(),
    {
      staleTime: Infinity
    }
  );

  return (
    <nav>
      <button onClick={() => setPage('planets')}>Planets</button>
      <button onClick={() => setPage('savedPlanets')}>
        Firestore Planets - {data?.length}
      </button>
      <button onClick={() => setPage('people')}>People</button>
    </nav>
  );
};

export default Navbar;
