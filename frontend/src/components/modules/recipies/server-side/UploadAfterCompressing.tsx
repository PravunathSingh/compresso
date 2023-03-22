import { Button, FileButton, Image, Select, TextInput } from '@mantine/core';
import React from 'react';
import { showNotification } from '@mantine/notifications';
import Compressor from 'compressorjs';
import { useMutation } from 'react-query';
import axios from 'axios';
import { saveAs } from 'file-saver';

const UploadAfterCompressing = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [compressedFile, setCompressedFile] = React.useState<File | null>(null);
  const [compressedSrc, setCompressedSrc] = React.useState<string | null>(null);
  const [serverCompressedSrc, setServerCompressedSrc] = React.useState<
    string | null
  >(null);

  const uploadImageHandler = useMutation((file: File) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('image', compressedFile as File);
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
        setServerCompressedSrc(res.data.imageUrl);
        console.log(res.data);
        // open the image in a new tab and download it

        saveAs(res.data.imageUrl, 'compressed-image');
      },
    });
  };

  const compressImage = async () => {
    if (file) {
      try {
        setIsCompressing(true);
        new Compressor(file, {
          quality: 0.5,
          mimeType: 'image/webp',
          convertSize: 200000,
          success(result) {
            // convert the result blob to a file and set it as the compressed file
            const compressedFile = new File([result], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            setCompressedFile(compressedFile);
            setCompressedSrc(URL.createObjectURL(compressedFile));
            setIsCompressing(false);
          },
        });
      } catch (error) {
        showNotification({
          title: 'Error',
          message: 'Image compression failed on client side failed',
          color: 'red',
        });
      }
    }
  };

  React.useEffect(() => {
    if (file) {
      compressImage();
    }
  }, [file]);

  return (
    <div>
      <h3 className='text-lg font-medium mb-6 text-center'>
        Compression on both client and server side
      </h3>
      <div className='mb-6 max-w-sm mx-auto'>
        <div className='max-w-max mx-auto'>
          <FileButton accept='image/*' onChange={setFile}>
            {(props) => (
              <Button
                className='mb-5'
                {...props}
                loading={isCompressing}
                loaderProps={{ color: 'white' }}
                loaderPosition='right'
              >
                Select and compress
              </Button>
            )}
          </FileButton>

          <Button
            type='reset'
            variant='outline'
            onClick={() => {
              setFile(null);
              setCompressedFile(null);
              setCompressedSrc(null);
            }}
            className='ml-3'
          >
            Reset
          </Button>
          <Button
            className='ml-3'
            disabled={!compressedFile}
            onClick={uploadImage}
            loading={uploadImageHandler.isLoading}
            loaderProps={{ color: 'white' }}
            loaderPosition='right'
          >
            Upload Image
          </Button>
        </div>
      </div>

      {compressedFile ? (
        <div className='flex flex-wrap justify-between items-center gap-4'>
          <div>
            <div className='mb-2'>
              <p>Compressed Img info:</p>
              <ul className='text-sm text-gray-700'>
                <li>
                  {compressedFile?.name} - {compressedFile?.type}
                </li>
                <li>
                  Size: {compressedFile?.size} bytes -{' '}
                  {Number(compressedFile?.size) / 1000} KB -{' '}
                  {Number(compressedFile?.size) / 1000000} MB
                </li>
              </ul>
            </div>
            <Image
              src={compressedSrc as string}
              alt={compressedFile?.name as string}
              maw={500}
              height={300}
              imageProps={{
                style: {
                  objectFit: 'cover',
                },
              }}
            />
          </div>

          {serverCompressedSrc ? (
            <div>
              <div className='mb-2'>
                <p>Compressed Img info:</p>
              </div>
              <Image
                src={serverCompressedSrc as string}
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

export default UploadAfterCompressing;
