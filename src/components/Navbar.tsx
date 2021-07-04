import React, { Dispatch, SetStateAction } from 'react';
import { TPageState } from '../App';

interface INavbar {
  setPage: Dispatch<SetStateAction<TPageState>>;
}

const Navbar: React.FC<INavbar> = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage('planets')}>Planets</button>
      <button onClick={() => setPage('savedPlanets')}>Firestore Planets</button>
      <button onClick={() => setPage('people')}>People</button>
    </nav>
  );
};

export default Navbar;
