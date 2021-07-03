import React, { Dispatch, SetStateAction } from 'react';

interface INavbar {
  setPage: Dispatch<SetStateAction<'planets' | 'people'>>;
}

const Navbar: React.FC<INavbar> = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage('planets')}>Planets</button>
      <button onClick={() => setPage('people')}>People</button>
    </nav>
  );
};

export default Navbar;
