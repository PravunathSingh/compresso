import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';
import { IconMenu2, IconX } from '@tabler/icons';
import { Drawer } from '@mantine/core';
import { useRouter } from 'next/router';

interface HeaderProps {}

const links = [
  {
    href: '/',
    label: 'Intro',
  },
  {
    href: '/recipies',
    label: 'Recipies',
  },
  {
    href: '/boring-stuff',
    label: 'The Boring Stuff',
  },
];

const Header: React.FC<HeaderProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { width } = useViewportSize();
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <nav>
      <div className='border-b border-b-gray-200'>
        <div className='container flex justify-between py-3 lg:py-4 items-center'>
          <Link href='/'>compresso</Link>

          <div className='hidden md:block'>
            <ul className='flex items-center space-x-8 md:mr-8 xl:mr-0'>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={
                      pathName === link.href
                        ? 'text-primary font-medium'
                        : 'text-gray-900 font-medium hover:text-primary'
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='block md:hidden'>
            <button
              type='button'
              className='text-2xl'
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? <IconMenu2 /> : null}
            </button>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <Drawer
          size='full'
          opened={isOpen && width < 780}
          onClose={() => setIsOpen(false)}
          withCloseButton={false}
        >
          <>
            <div className='bg-gray-50 border-b border-b-gray-300'>
              <div className='container flex justify-between items-center py-3'>
                <Link href='/' passHref>
                  compresso
                </Link>
                <button
                  type='button'
                  className='text-2xl'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {!isOpen ? null : <IconX />}
                </button>
              </div>
            </div>
            <div className='flex flex-col container mt-10 h-full'>
              <ul className='flex flex-col space-y-8'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-gray-600 font-inter hover:text-primary'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        </Drawer>
      </div>
    </nav>
  );
};

export default Header;
