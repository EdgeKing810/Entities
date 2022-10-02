import React from 'react';

import Header from './components/Header';
import SideNavbar from './components/SideNavbar';

export default function App() {
  return (
    <div className="flex justify-center items-center flex-col sm:overflow-hidden">
      <Header />
      <div className="w-full sm:mt-8 mt-4 lg:px-24">
        <SideNavbar />
      </div>
    </div>
  );
}
