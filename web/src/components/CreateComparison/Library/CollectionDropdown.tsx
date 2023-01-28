import { useRef, useState } from 'react';

import { Coordinates } from './CollectionCard';

type Props = {
  // coordinates: Coordinates;
  // buttonRef: RefObject<HTMLButtonElement>
};

const CollectionDropdown = (props: Props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const elementRef = useRef<HTMLButtonElement>(null);
  const [dropdownLocation, setDropdownLocation] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  return (
    <>
      <button
        ref={elementRef}
        onClick={(event) => {
          setDropdownVisible(!dropdownVisible);
          setDropdownLocation({
            x: elementRef.current?.getBoundingClientRect().x || 0,
            y: elementRef.current?.getBoundingClientRect().y || 0,
          });
          //...
        }}
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown search
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        style={{
          zIndex: 1000,
          top: dropdownLocation.y,
          left: dropdownLocation.x,
        }}
        id="dropdownSearch"
        className={` absolute ${
          dropdownVisible ? 'block' : 'hidden'
        } bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
      >
        <div className="p-3 bg-gray-700">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg> */}
            </div>
            <input
              type="text"
              id="input-group-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search user"
            />
          </div>
        </div>
        <ul
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 bg-gray-700"
          aria-labelledby="dropdownSearchButton"
        >
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-11"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-11"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Bonnie Green
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                checked
                id="checkbox-item-12"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-12"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Jese Leos
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-13"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-13"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Michael Gough
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-14"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-14"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Robert Wall
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-15"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-15"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Joseph Mcfall
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-16"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-16"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Leslie Livingston
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-17"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-17"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Roberta Casas
              </label>
            </div>
          </li>
        </ul>
        <a
          href="#"
          className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
        >
          <svg
            className="w-5 h-5 mr-1"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path>
          </svg>
          Delete user
        </a>
      </div>
    </>
  );
};

export default CollectionDropdown;
