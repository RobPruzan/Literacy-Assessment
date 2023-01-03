import React from 'react';
import { Link } from 'react-router-dom';
export type AboutNavbarProps = {
  color: 'white' | 'custom-blue';
};
export const AboutNavbar = ({ color }: AboutNavbarProps) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
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

            <Link className="Nav__link mx-2" to="/About">
              About
            </Link>

            <Link className="Nav__link mx-2" to="/">
              Progress
            </Link>
          </div>
        </div>
      </nav> */}
      <nav
        className={`relative flex flex-wrap items-center justify-between px-2 py-3 bg-${color}  shadow-md  overflow-visible`}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start xl:justify-start:">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              NorthStar
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <Link className="Nav__link mx-2" to="/Analysis">
                    Analysis
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <Link className="Nav__link mx-2" to="/">
                    About
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
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
