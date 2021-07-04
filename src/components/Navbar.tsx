import React, { Dispatch, SetStateAction } from 'react';
import { TPageState } from '../App';
import useQuerySavedPlanets from '../hooks/firestore/useQuerySavedPlanets';

interface INavbar {
  setPage: Dispatch<SetStateAction<TPageState>>;
}

const Navbar: React.FC<INavbar> = ({ setPage }) => {
  const { data } = useQuerySavedPlanets();

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
