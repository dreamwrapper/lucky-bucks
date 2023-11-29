import { projectMenu } from '@/assets/data/Sidebar/project-menu';
import { CustomFlowbiteTheme, Sidebar as SB } from 'flowbite-react';
import { HiHomeModern, HiCurrencyDollar } from 'react-icons/hi2';

function SidebarBackdrop({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-30 opacity-50 dark:bg-gray-950 ${
        isSidebarOpen ? 'hidden' : 'block'
      }`}
    />
  );
}

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const sidebarCustomTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      base: 'h-screen fixed top-0 border-r left-0 z-40 dark:border-gray-700 transition-transform pt-14 dark:bg-gray-800 bg-gray-50',
      collapsed: {
        on: '-translate-x-full',
        off: 'translate-x-0 w-full md:w-64',
      },
      inner:
        'h-full scrollbar-hide overflow-y-auto overflow-x-hidden py-4 px-3',
    },
  };

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
            <SB.Item
              href='https://luckybucks.io'
              target='_blank'
              icon={HiHomeModern}
            >
              Home
            </SB.Item>
            <SB.Item
              href='https://casino.luckybucks.io'
              target='_blank'
              icon={HiCurrencyDollar}
            >
              Casino
            </SB.Item>
          </SB.ItemGroup>
          <SB.ItemGroup>
            {projectMenu.map((item, i) => (
              <SB.Collapse key={i} icon={item.icon} label={item.text}>
                {item.submenu.map((subitem, j) => (
                  <SB.Item
                    key={j}
                    href={subitem.href}
                    download={subitem.href === '/whitepaper.pdf' ? true : false}
                    target='_blank'
                  >
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
