import { useState } from 'react';

import { Link } from 'react-router-dom';

export type AboutNavbarProps = {
  color: 'white' | 'custom-blood-red';
};
export const AboutNavbar = ({ color }: AboutNavbarProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      {/* <nav className="h-12 bg-black">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            color: 'white',
          }}
        >
          <Link to="/" className="Nav__brand"></Link>
          <div className="Nav__right">
            <Link className="Nav__link mx-2" to="/Analysis">
              Analysis
            </Link>

            <Li className="Nav__link mx-2" to="/About">
              About
            </Li

            <Link className="Nav__link mx-2" to="/">
              Progress
            </Link>
          </div>
        </div>
      </nav> */}
      <nav
        className={`relative flex flex-wrap items-center justify-between px-2 py-3 bg-${color}  overflow-visible  shadow-md`}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="xl:justify-start: relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <a
              className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-white"
              href="/"
            >
              NorthStar
            </a>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'flex-grow items-center lg:flex' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="nav-item">
                <div className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75">
                  <i className="fab fa-facebook-square leading-lg text-lg text-white opacity-75"></i>
                  <Link className="Nav__link mx-2" to="/Analysis">
                    Analysis
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75">
                  <i className="fab fa-twitter leading-lg text-lg text-white opacity-75"></i>
                  <Link className="Nav__link mx-2" to="/">
                    About
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75">
                  <i className="fab fa-pinterest leading-lg text-lg text-white opacity-75"></i>
                  <Link className="Nav__link mx-2" to="/create-comparison">
                    Compare
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
