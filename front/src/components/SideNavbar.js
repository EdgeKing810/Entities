import React, { useState, useContext, useEffect } from 'react';
import {
  useHistory,
  useLocation,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Context } from '../Context';

import List from './List';
import Add from './Add';
import Edit from './Edit';

export default function SideNavbar() {
  const { navID, setNavID, navElements, reset, API_URL } = useContext(Context);
  const [listOpen, setListOpen] = useState(true);

  const routes = navElements.map((nav) => (
    <Switch key={`switch-${nav.path}`}>
      <Route exact path={`/${nav.path}`}>
        <List
          title={nav.title}
          color={nav.color}
          prev={nav.path}
          context={nav.context}
          reset={reset}
          API_URL={API_URL}
        />
      </Route>
      <Route exact path={`/${nav.path}/edit/:itemID`}>
        <Edit
          title={nav.title}
          color={nav.color}
          prev={nav.path}
          context={nav.context}
          API_URL={API_URL}
        />
      </Route>
      <Route exact path={`/${nav.path}/add`}>
        <Add
          title={nav.title}
          color={nav.color}
          prev={nav.path}
          context={nav.context}
          API_URL={API_URL}
        />
      </Route>
    </Switch>
  ));

  const burger = () => (
    <button
      className="ml-2 sm:w-12 sm:h-12 w-8 h-8 px-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-900 focus:bg-gray-900 transition duration-300 ease-in-out"
      onClick={() => setListOpen((prev) => !prev)}
    >
      <i className="ri-menu-line sm:text-2xl text-xl" />
    </button>
  );

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setNavID(0);

    const currentLocation = location.pathname.split('/')[1];
    navElements.forEach((nav, i) => {
      if (nav.path.toString() === currentLocation.toString()) {
        setNavID(i);
      }
    });
    // eslint-disable-next-line
  }, []);

  const list = navElements.map((nav) => (
    <button
      className={`sm:p-2 sm:py-2 py-2 sm:pl-4 my-1 sm:text-left text-center sm:w-4/5 w-1/2 font-karla tracking-wide font-bold text-gray-400 sm:text-base text-sm sm:mr-8 rounded-lg ease-in-out duration-300 ${
        nav.id === navID
          ? `bg-${nav.color}-600`
          : 'hover:bg-gray-700 focus:bg-gray-700'
      }`}
      onClick={() => {
        history.push(`/${nav.path}`);
        setNavID(nav.id);
      }}
      key={`nav-${nav.id}`}
    >
      {nav.title}
    </button>
  ));

  return (
    <div className="w-screen flex sm:flex-row flex-col sm:justify-around sm:items-start items-center">
      <div className="sm:w-1/5 w-5/6 flex flex-col sm:items-stretch items-center sm:mb-0 mb-2">
        <div className="font-mono tracking-widest sm:text-xl text-md text-gray-300 uppercase flex flex-col sm:text-left text-center mb-2">
          <div className="flex items-center">Menu {burger()}</div>
        </div>
        <div
          className={`transform w-full flex flex-col sm:items-start items-center ${
            listOpen
              ? 'translate-x-0 ease-out duration-300'
              : '-translate-x-screen ease-in duration-300 h-0'
          }`}
        >
          {list}
        </div>
      </div>
      <div className="sm:w-4/5 w-full sm:px-0 px-2">
        {routes}
        <Switch>
          <Route exact path="/">
            <Redirect to={navElements[0].path}></Redirect>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
