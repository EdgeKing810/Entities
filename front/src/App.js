import React from 'react';

import Header from './components/Header';
import SideNavbar from './components/SideNavbar';

export default function App() {
  return (
    <div className="flex justify-center items-center flex-col lg:px-24">
      <Header />
      <div className="w-screen sm:mt-8 mt-4">
        <SideNavbar />
      </div>
    </div>
  );
}
