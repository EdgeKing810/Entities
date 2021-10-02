import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Edit({ title, prev, color, context }) {
  const [values, func] = context;
  const { itemID } = useParams();

  const { id, name, tagline } = values.find((value) => value.id === itemID);

  const [localName, setLocalName] = useState(name);
  const [localTagline, setLocalTagline] = useState(tagline);

  const history = useHistory();

  const submitChange = (e) => {
    e.preventDefault();

    const updatedItem = {
      id: id,
      name: localName,
      tagline: localTagline,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/update`, {
      ...updatedItem,
      category: prev,
    });

    const updatedItems = values.filter((value) => value.id !== id);
    func([updatedItem, ...updatedItems]);

    history.push(`/${prev}`);
  };

  return (
    <div className="w-full">
      <div className="sm:w-5/6 w-full rounded border-2 border-gray-900 mb-4 sm:mx-0 mx-auto bg-gray-900">
        <form
          onSubmit={(e) => (localName && localTagline ? submitChange(e) : null)}
          className="w-full"
        >
          <div
            className={`font-nunito font-bold tracking-widest uppercase text-gray-900 sm:text-2xl text-lg py-2 bg-${color}-400 px-4 rounded-t`}
          >
            {title}
          </div>
          <div className="w-full px-2">
            <div
              className={`font-karla sm:text-xl text-md mt-4 mb-2 font-bold text-${color}-400 tracking-widest`}
            >
              Name
            </div>
            <input
              type="text"
              className={`w-full rounded bg-gray-400 p-2 border-4 border-gray-800 hover:bg-${color}-200 hover:border-${color}-700 focus:bg-${color}-200 focus:border-${color}-700`}
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              id="name"
              name="name"
            />
            <div
              className={`font-karla sm:text-xl text-md mt-4 mb-2 font-bold text-${color}-400 tracking-widest`}
            >
              Tagline
            </div>
            <input
              type="text"
              className={`w-full rounded bg-gray-400 p-2 border-4 border-gray-800 hover:bg-${color}-200 hover:border-${color}-700 focus:bg-${color}-200 focus:border-${color}-700`}
              value={localTagline}
              onChange={(e) => setLocalTagline(e.target.value)}
              id="tagline"
              name="tagline"
            />
          </div>
          <div className="flex w-full rounded-b mt-6 justify-around">
            <button
              className={`border-t-2 border-gray-800 w-1/45 py-2 font-nunito tracking-wider text-gray-500 font-bold sm:text-lg text-sm flex justify-center ${
                localName && localTagline
                  ? `hover:text-${color}-300 focus:text-${color}-300 hover:border-${color}-300 focus:border-${color}-300 transition duration-300 ease-in-out`
                  : `opacity-50`
              }`}
              type="submit"
              disabled={!localName && !localTagline}
            >
              Update <i className="ri-save-line ml-2" />
            </button>
            <Link
              className={`border-t-2 border-gray-800 w-1/45 py-2 font-nunito tracking-wider text-gray-500 font-bold sm:text-lg text-sm flex justify-center hover:text-${color}-300 focus:text-${color}-300 hover:border-${color}-300 focus:border-${color}-300 transition duration-300 ease-in-out`}
              to={`/${prev}`}
            >
              Cancel <i className="ri-close-line ml-2" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
