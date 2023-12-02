import { HiFolder, HiMiniShoppingBag, HiLink } from 'react-icons/hi2';

export const projectMenu = [
  {
    icon: HiFolder,
    text: 'Project',
    submenu: [
      {
        href: '/whitepaper.pdf',
        text: 'Whitepaper',
      },
      {
        href: 'https://explorer.octa.space/address/0x8DbC9F88b1a6292BaC0E8a214AD5223703aeB506',
        text: 'Token Contract',
      },
      {
        href: '#',
        text: 'Lottery Contract',
      },
    ],
  },
  {
    icon: HiMiniShoppingBag,
    text: 'Markets',
    submenu: [
      {
        href: 'https://xeggex.com/market/LBC_USDT',
        text: 'Xeggex',
      },
      {
        href: 'https://www.pacman.trade/#/exchange/lbc_usdt',
        text: 'Pacman',
      },
    ],
  },
  {
    icon: HiLink,
    text: 'Socials',
    submenu: [
      {
        href: 'https://discord.gg/hpYvJfxD6c',
        text: 'Discord',
      },
      {
        href: 'https://twitter.com/Lucky_B_Casino',
        text: 'Twitter',
      },
      {
        href: 'https://t.me/lbcgroup1',
        text: 'Telegram',
      },
    ],
  },
];
