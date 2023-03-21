import React from 'react';
import UploadAfterCompressing from './UploadAfterCompressing';
import UploadWithoutCompressing from './UploadWithoutCompressing';

const ServerSideRecipies = () => {
  return (
    <div className='flex flex-wrap justify-center gap-6'>
      <UploadWithoutCompressing />
      <UploadAfterCompressing />
    </div>
  );
};

export default ServerSideRecipies;
