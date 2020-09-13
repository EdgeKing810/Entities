import React from 'react';

import Header from './components/Header';
import SideNavbar from './components/SideNavbar';

export default function App() {
  return (
    <div>
      <Header />
      <div className="w-screen sm:mt-8 mt-4">
        <SideNavbar />
      </div>
    </div>
  );
}
