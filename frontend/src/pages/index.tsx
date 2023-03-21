import { Inter } from 'next/font/google';
import SeoHeader from '@/components/seo/SeoHeader';
import Header from '@/components/ui/Header';
import { Button } from '@mantine/core';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <SeoHeader
        title='Intro'
        description='Compresso is a free, and open-source, image compression tool.'
      />
      <Header />
      <main className='max-w-4xl mx-auto container my-16 lg:my-24'>
        <div className='mb-8 lg:mb-10 text-center'>
          <h1 className='text-4xl font-bold font-inter mb-3'>Compresso</h1>
          <p className='text-gray-600 font-medium mb-3'>
            Image Compression for the Web demystified.
          </p>
          <p className='mb-7'>
            Compresso is a free, and open-source, image compression tool. It is
            created to help you understand how image compression works.
          </p>

          <Button>
            <Link href='/recipies'>Get Started</Link>
          </Button>
        </div>

        <div>
          <h2 className='text-center font-semibold text-3xl mb-4'>
            How it works?
          </h2>
          <p className='font-medium mb-6'>
            It allows you to upload an image and see how it is compressed using
            different approaches. It also allows you to see the effect of
            different compression parameters on the image quality.
          </p>
          <div>
            <p className='text-lg font-medium mb-2'>
              The approaches demonstrated are mainly divided into 3 categories:
            </p>
            <ul className='list-disc list-inside mb-6'>
              <li>Client Side Compression</li>
              <li>Server Side Compression</li>
              <li>
                Compression using a third-party service (like{' '}
                <a href='https://tinypng.com/'>TinyPNG</a>)
              </li>
            </ul>
            <p className='mb-6'>
              Each approach has its own advantages and disadvantages. The goal
              of this app is to help you understand the tradeoffs involved in
              each approach and help you make an informed decision.
            </p>

            <p>
              Furthermore each of the above approaches can be further divided
              based on what tools and techniques are being used. For example,
              the client side compression can be done using the HTML5 canvas API
              or using a library like{' '}
              <span className='text-primary font-semibold italic'>
                <Link href='https://fengyuanchen.github.io/compressorjs/'>
                  Compressorjs.
                </Link>
              </span>{' '}
              Similarly, the server side compression can be done using a library
              like or using a service like{' '}
              <span className='text-primary font-semibold italic'>
                <Link href='https://www.npmjs.com/package/sharp'>Sharp.</Link>
              </span>{' '}
              Or using a service like{' '}
              <span className='text-primary font-semibold italic'>
                <Link href='https://cloudinary.com/'>Cloudinary.</Link>
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
