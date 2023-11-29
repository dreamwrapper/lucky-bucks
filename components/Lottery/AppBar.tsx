'use client';

import { useState } from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppBar() {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOnClick = () => setIsSidebarOpen(!IsSidebarOpen);

  return (
    <>
      <Navbar onClick={handleOnClick} />
      <Sidebar isSidebarOpen={IsSidebarOpen} />
    </>
  );
}
