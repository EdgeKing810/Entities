import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Context = React.createContext();

export default function Provider(props) {
  const [heroes, setHeroes] = useState([]);
  const [villains, setVillains] = useState([]);

  const fetchData = () => {
    setHeroes([]);
    setVillains([]);

    axios.get(`${process.env.REACT_APP_API_URL}/`).then((res) =>
      res.data.forEach((item) => {
        if (item.category === 'heroes') {
          setHeroes((prev) => [...prev, item]);
        } else if (item.category === 'villains') {
          setVillains((prev) => [...prev, item]);
        }
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reset = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/reset`).then(() => fetchData());
  };

  const navElements = [
    {
      id: 0,
      title: 'Heroes',
      path: 'heroes',
      color: 'blue',
      context: [heroes, setHeroes],
    },
    {
      id: 1,
      title: 'Villains',
      path: 'villains',
      color: 'red',
      context: [villains, setVillains],
    },
  ];

  const [navID, setNavID] = useState(0);

  return (
    <Context.Provider value={{ navID, setNavID, navElements, reset }}>
      {props.children}
    </Context.Provider>
  );
}

export { Provider, Context };
