import { Button, FileButton, Image } from '@mantine/core';
import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { saveAs } from 'file-saver';

const UploadWithoutCompressing = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [compressedSrc, setCompressedSrc] = React.useState<string | null>(null);
  const uploadImageHandler = useMutation((file: File) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      formData,
      config
    );
  });

  const uploadImage = () => {
    uploadImageHandler.mutate(file as File, {
      onSuccess: (res) => {
        // get the compressed image from the public folder and set it as the src
        setCompressedSrc(res.data.imageUrl);
        // open the image in a new tab and download it

        saveAs(res.data.imageUrl, 'compressed-image');
      },
    });
  };

  const unCompressedSrc = file ? URL.createObjectURL(file) : null;
  return (
    <div>
      <h3 className='text-lg break-words font-medium mb-6 text-center'>
        Pure Server side compression
      </h3>
      <div className='mb-6 max-w-lg mx-auto'>
        <div className='max-w-max mx-auto'>
          <FileButton accept='image/*' onChange={setFile}>
            {(props) => (
              <Button className='mb-5' {...props}>
                Select Image
              </Button>
            )}
          </FileButton>

          <Button
            type='reset'
            variant='outline'
            onClick={() => {
              setFile(null);
              setCompressedSrc(null);
            }}
            className='ml-4'
          >
            Reset
          </Button>

          <Button
            disabled={!file}
            className='ml-4'
            onClick={uploadImage}
            loading={uploadImageHandler.isLoading}
            loaderProps={{ color: 'white' }}
            loaderPosition='right'
          >
            Upload Image
          </Button>
        </div>
      </div>

      {file ? (
        <div className='flex flex-wrap justify-between items-center gap-4'>
          <div>
            <div className='mb-2'>
              <p>Uncompressed Img info:</p>
              <ul className='text-sm text-gray-700'>
                <li>
                  {file?.name} - {file?.type}
                </li>
                <li>
                  Size: {file?.size} bytes - {Number(file?.size) / 1000} KB -{' '}
                  {Number(file?.size) / 1000000} MB
                </li>
              </ul>
            </div>
            <Image
              src={unCompressedSrc as string}
              alt={file?.name as string}
              maw={500}
              height={300}
              imageProps={{
                style: {
                  objectFit: 'cover',
                },
              }}
            />
          </div>

          {compressedSrc ? (
            <div>
              <div className='mb-2'>
                <p>Compressed Img info:</p>
              </div>
              <Image
                src={compressedSrc as string}
                alt='Compressed Image'
                maw={500}
                height={300}
                imageProps={{
                  style: {
                    objectFit: 'cover',
                  },
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default UploadWithoutCompressing;
