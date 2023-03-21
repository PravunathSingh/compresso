import React from 'react';
import CanvasCompressor from './CanvasCompressor';
import CompressorJSCompressor from './CompressorJSCompressor';

const ClientSideRecipies = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-6'>
      <CanvasCompressor />
      <CompressorJSCompressor />
    </div>
  );
};

export default ClientSideRecipies;
