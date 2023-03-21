import { Button, Card } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface RecipieCardProps {
  title: string;
  description: string;
}

const RecipieCard: React.FC<RecipieCardProps> = ({ title, description }) => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <Card shadow='sm' p='lg' radius='md' withBorder>
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>

      <p className='text-gray-700 mb-5'>{description}</p>

      <Button fullWidth>
        <Link href={`${pathName}/${title.toLowerCase().replace(' ', '-')}`}>
          Start playing
        </Link>
      </Button>
    </Card>
  );
};

export default RecipieCard;
