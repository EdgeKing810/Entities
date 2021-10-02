import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function List({ title, prev, color, context, reset }) {
  const [values, func] = context;

  const [currentValue, setCurrentValue] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [msg, setMsg] = useState('Loading...');

  const sortedValues = values
    ? values.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      )
    : [];

  const prepareDelete = (value) => {
    document.body.style.overflow = 'hidden';
    setCurrentValue(value);
    setShowDelete(true);
  };

  const prepareRefresh = () => {
    const validate = window.confirm('Reset everything?');
    if (validate) {
      reset();
    }
  };

  const cancelDelete = () => {
    setCurrentValue({});
    setShowDelete(false);
  };

  const deleteItem = (id) => {
    document.body.style.overflow = 'scroll';
    document.body.style.overflowX = 'hidden';
    if (window.width > 640) {
      document.body.style.overflowY = 'hidden';
    }
    func(values.filter((value) => value.id !== id));
    setShowDelete(false);

    axios.post(`${process.env.REACT_APP_API_URL}/delete`, {
      id: id,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setMsg('No Content to Display.');
    }, [1500]);
  }, []);

  const items = sortedValues.map((value) => (
    <div
      className="sm:w-5/6 w-full rounded pt-6 px-4 border-2 border-gray-900 mb-4 sm:mx-0 mx-auto bg-gray-900"
      key={value.id}
    >
      <div
        className={`font-karla tracking-wider text-${color}-300 sm:text-3xl text-xl`}
      >
        {value.name}
      </div>
      <div className="font-karla tracking-wider text-gray-600 sm:text-xl text-md">
        {value.tagline}
      </div>
      <div className="flex w-full rounded-b mt-6 justify-around">
        <Link
          className={`border-t-2 border-gray-800 w-1/45 py-2 font-nunito tracking-wider text-gray-500 font-bold sm:text-lg text-sm flex justify-center hover:text-${color}-300 focus:text-${color}-300 hover:border-${color}-300 focus:border-${color}-300 transition duration-300 ease-in-out`}
          to={`/${prev}/edit/${value.id}`}
        >
          Edit <i className="ri-pencil-line ml-2" />
        </Link>
        <button
          className={`border-t-2 border-gray-800 w-1/45 py-2 font-nunito tracking-wider text-gray-500 font-bold sm:text-lg text-sm flex justify-center hover:text-${color}-300 focus:text-${color}-300 hover:border-${color}-300 focus:border-${color}-300 transition duration-300 ease-in-out`}
          onClick={(e) => prepareDelete(value)}
        >
          Delete <i className="ri-delete-bin-line ml-2" />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="w-full sm:h-nearly">
      <div className="w-full flex items-center mb-4">
        <div
          className={`font-nanum tracking-widest font-extrabold text-gray-300 sm:text-4xl text-2xl text-lg border-${color}-400 border-l-12 border-b-2 pl-2 sm:w-1/5`}
        >
          {title}
        </div>
        <Link
          to={`/${prev}/add`}
          className={`ri-add-line sm:text-4xl text-2xl font-bold text-gray-500 hover:text-${color}-300 ml-2 transition duration-300 ease-in-out`}
        />
        <button
          className={`ri-refresh-line sm:text-3xl text-2xl font-bold text-gray-500 hover:text-${color}-300 ml-2 transition duration-300 ease-in-out`}
          onClick={() => prepareRefresh()}
        />
      </div>
      <div
        className={`${
          showDelete
            ? 'z-50 fixed sm:h-screen h-full sm:w-3/5 w-5/6 sm:p-8'
            : 'opacity-0 h-0 w-0'
        } bg-gray-800 flex justify-center`}
      >
        <div className="rounded sm:w-3/5 w-5/6 sm:h-1/5 h-2/5 sm:mt-8 mt-2 bg-gray-800 sm:border-2 sm:border-gray-500 flex flex-col items-center">
          <div
            className={`font-karla tracking-wide text-${color}-200 font-bold sm:text-2xl text-lg mt-2`}
          >
            Confirm to delete {currentValue.name}?
            <div className="flex items-end h-full justify-between my-auto">
              <button
                onClick={() => deleteItem(currentValue.id)}
                className="w-2/5 font-nanum text-gray-500 py-1 font-bold rounded-lg border-2 border-dashed border-green-200 hover:text-gray-900 hover:bg-green-200 focus:text-gray-900 focus:bg-green-200 transition duration-300 ease-in-out"
              >
                Yes
              </button>
              <button
                onClick={() => cancelDelete()}
                className="w-2/5 font-nanum text-gray-500 py-1 font-bold rounded-lg border-2 border-dashed border-red-200 hover:text-gray-900 hover:bg-red-200 focus:text-gray-900 focus:bg-red-200 transition duration-300 ease-in-out"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll sm:h-11/12">
        {items.length > 0 ? (
          items
        ) : (
          <div
            className={`font-karla tracking-wider text-${color}-300 sm:text-3xl text-xl`}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
