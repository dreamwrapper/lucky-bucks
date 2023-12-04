'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppBar() {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOpenSidebar = () => setIsSidebarOpen(!IsSidebarOpen);

  return (
    <>
      <Navbar handleOpenSidebar={handleOpenSidebar} />
      <Sidebar isSidebarOpen={IsSidebarOpen} />
    </>
  );
}
