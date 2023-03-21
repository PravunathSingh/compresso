import Head from 'next/head';
import React from 'react';

export interface SeoHeaderProps {
  title: string;
  description: string;
}

const SeoHeader: React.FC<SeoHeaderProps> = ({ description, title }) => {
  return (
    <Head>
      <title>{`${title} | Compresso`}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default SeoHeader;
