import ClientSideRecipies from '@/components/modules/recipies/client-side/ClientSideRecipies';
import ServerSideRecipies from '@/components/modules/recipies/server-side/ServerSideRecipies';
import SeoHeader from '@/components/seo/SeoHeader';
import Header from '@/components/ui/Header';
import { compressImageWithCanvas } from '@/utils/canvasCompressor';
import { Button, FileButton } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const RecipiePage = () => {
  const router = useRouter();

  const { recipie } = router.query;

  const recipieName = String(recipie).split('-').join(' ');

  return (
    <>
      <SeoHeader
        title={recipieName}
        description='Compresso is a free, and open-source, image compression tool.'
      />

      <main>
        <Header />
        <div className='container my-10 lg:my-16'>
          <h2 className='text-2xl font-semibold mb-8 text-center'>
            This is the recipie page for {recipieName} compression
          </h2>

          {recipie === 'client-side' && <ClientSideRecipies />}
          {recipie === 'server-side' && <ServerSideRecipies />}
        </div>
      </main>
    </>
  );
};

export default RecipiePage;
