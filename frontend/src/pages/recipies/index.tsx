import RecipieCard from '@/components/modules/recipies/RecipieCard';
import SeoHeader from '@/components/seo/SeoHeader';
import Header from '@/components/ui/Header';
import React from 'react';

const RecipiesPage = () => {
  return (
    <>
      <SeoHeader
        title='Recipies'
        description='Compresso is a free, and open-source, image compression tool.'
      />

      <main>
        <Header />
        <div className='container my-14 lg:my-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <RecipieCard
            title='Client Side'
            description='Client side compression is the most common approach to compressing images. It is also the easiest to implement. It is also the most performant approach. However, it has some drawbacks. It is not secure and it is not scalable. The tools 
            we will use to demonstrate this approach are: HTML Canvas and CompressorJs'
          />
          <RecipieCard
            title='Server Side'
            description='
            In server side compression we will be uploading the raw image to the server and compressing it there. This approach is more secure and scalable than client side compression. However, it is not as performant as client side compression. The tools we will use to demonstrate this approach are: Jimp, Imagemim, Sharp and multer
            '
          />
          {/* <RecipieCard
            title='Third Party'
            description='
            In this approach we will be using a third party service to compress our images. This approach is the easiest to implement. The tools we will use to demonstrate this approach are: AWS S3 buckets along with Lamda functions and Cloudinary'
          /> */}
        </div>
      </main>
    </>
  );
};

export default RecipiesPage;
