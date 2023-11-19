'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CustomFlowbiteTheme, Navbar as NB } from 'flowbite-react';
import {
  HiBars3,
  HiHomeModern,
  HiCurrencyDollar,
  HiTicket,
  HiFolder,
  HiMiniShoppingBag,
  HiLink,
} from 'react-icons/hi2';
import { Sidebar as SB } from 'flowbite-react';
import UserButton from './UserButton';

function SidebarBackdrop({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-30 opacity-50 dark:bg-gray-950 ${
        isSidebarOpen ? 'hidden' : 'block'
      }`}
    />
  );
}

function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const sidebarCustomTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      base: 'h-screen fixed top-0 border-r left-0 z-40 dark:border-gray-700 transition-transform pt-14 dark:bg-gray-800 bg-gray-50',
      collapsed: {
        on: '-translate-x-full',
        off: 'translate-x-0 w-full md:w-64',
      },
      inner: 'h-full overflow-y-auto overflow-x-hidden py-4 px-3',
    },
  };

  const projectMenu = [
    {
      icon: HiFolder,
      text: 'Project',
      submenu: [
        {
          href: '#',
          text: 'Whitepaper',
        },
        {
          href: '#',
          text: 'Token Contract',
        },
      ],
    },
    {
      icon: HiMiniShoppingBag,
      text: 'Markets',
      submenu: [
        {
          href: '#',
          text: 'Xeggex',
        },
      ],
    },
    {
      icon: HiLink,
      text: 'Socials',
      submenu: [
        {
          href: '#',
          text: 'Discord',
        },
        {
          href: '#',
          text: 'Twitter',
        },
        {
          href: '#',
          text: 'Telegram',
        },
      ],
    },
  ];

  return (
    <>
      <SB
        as='aside'
        aria-label='Default SB example'
        collapsed={isSidebarOpen}
        theme={sidebarCustomTheme}
      >
        <SB.Items>
          <SB.ItemGroup>
            <SB.Item href='#' icon={HiHomeModern}>
              Home
            </SB.Item>
            <SB.Item href='#' icon={HiCurrencyDollar}>
              Casino
            </SB.Item>
            <SB.Item href='#' icon={HiTicket}>
              Lottery
            </SB.Item>
          </SB.ItemGroup>
          <SB.ItemGroup>
            {projectMenu.map((item, i) => (
              <SB.Collapse key={i} icon={item.icon} label={item.text}>
                {item.submenu.map((subitem, j) => (
                  <SB.Item key={j} href={subitem.href}>
                    {subitem.text}
                  </SB.Item>
                ))}
              </SB.Collapse>
            ))}
          </SB.ItemGroup>
        </SB.Items>
      </SB>
      <SidebarBackdrop isSidebarOpen={isSidebarOpen} />
    </>
  );
}

function Navbar({ onClick }: { onClick: () => void }) {
  return (
    <NB fluid className='sticky top-0 z-50 border-b'>
      <div className='flex items-center gap-x-3'>
        <button onClick={onClick}>
          <HiBars3 className='h-9 w-9' />
        </button>
        <NB.Brand as={Link} href='#'>
          <span className='self-center whitespace-nowrap text-2xl font-bold dark:text-white'>
            Lucky Bucks
          </span>
        </NB.Brand>
      </div>
      <UserButton />
    </NB>
  );
}

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
