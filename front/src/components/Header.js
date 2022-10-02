import React from 'react';

import k_logo from './k_logo.png';

export default function Header() {
  return (
    <div className="sm:h-24 h-16 bg-gray-900 flex items-center justify-between w-full">
      <div className="flex items-center sm:w-1/2">
        <a
          href="https://www.kinesis.games"
          className="sm:w-20 w-12 ml-2 hover:bg-gray-700 focus:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="object-scale-down object-center"
            src={k_logo}
            alt="<KinesisGames' Logo>"
          ></img>
        </a>
        <div className="font-bold sm:text-3xl tracking-widest font-nanum flex sm:ml-4 ml-2">
          <p className="text-blue-300">Kinesis</p>
          <p className="text-yellow-300 sm:mr-2 mr-1">Games'</p>
          <p className="text-gray-500">Heroes</p>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center sm:w-1/2">
        <a
          href="https://github.com/EdgeKing810"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:w-16 w-12 sm:h-16 h-12 hover:bg-gray-800 focus:bg-gray-800 flex justify-center items-center mr-2 rounded-full transition duration-300 ease-in-out"
        >
          <i className="ri-github-line sm:text-3xl text-2xl text-blue-300"></i>
        </a>
      </div>
    </div>
  );
}
