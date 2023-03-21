import { compressImageWithCanvas } from '@/utils/canvasCompressor';
import { Button, FileButton, Image, Select, TextInput } from '@mantine/core';
import React from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { showNotification } from '@mantine/notifications';

const schema = yup.object().shape({
  // quality is a number that should be between 0 and 1 (inclusive) and is required
  quality: yup.number().min(0).max(1).required(),
  // type is a string that should be either 'image/jpeg' or 'image/png' or 'image/webp and is required
  type: yup.string().oneOf(['image/jpeg', 'image/webp']).required(),
});

const imgTypes = [
  {
    label: 'JPEG',
    value: 'image/jpeg',
  },
  {
    label: 'WebP',
    value: 'image/webp',
  },
];

const CanvasCompressor = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [compressedFile, setCompressedFile] = React.useState<File | null>(null);
  const [compressedSrc, setCompressedSrc] = React.useState<string | null>(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quality: 0.8,
      type: 'image/jpeg',
    },
  });

  // convert the file to a src string for the image
  const unCompressedSrc = file ? URL.createObjectURL(file) : null;

  const compressImage = form.handleSubmit(async (data) => {
    if (file) {
      try {
        const compressedFile = await compressImageWithCanvas(
          file,
          data.quality,
          data.type
        );
        setCompressedFile(compressedFile);
        setCompressedSrc(URL.createObjectURL(compressedFile));
      } catch (error) {
        showNotification({
          title: 'Error',
          message: 'Image compression failed',
          color: 'red',
        });
      }
    }
  });

  const downloadCompressedImage = () => {
    if (compressedFile) {
      // download the compressed file
      const a = document.createElement('a');
      a.href = URL.createObjectURL(compressedFile);
      a.download = compressedFile.name;
      a.click();
    }
  };

  return (
    <div>
      <div>
        <h3 className='text-lg font-medium mb-6 text-center'>
          Compression using Raw HTML Canvas
        </h3>
        <div className='mb-6 max-w-sm mx-auto'>
          <div className='max-w-max mx-auto'>
            <FileButton accept='image/*' onChange={setFile}>
              {(props) => (
                <Button className='mb-5' {...props}>
                  Upload Image
                </Button>
              )}
            </FileButton>
          </div>

          <FormProvider {...form}>
            <form onSubmit={compressImage}>
              <Controller
                name='quality'
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label='Quality (recommended: 0.6 - 0.8)'
                    type='number'
                    min={0}
                    max={1}
                    step={0.1}
                    placeholder='Enter a number between 0 - 1'
                    error={form.formState.errors.quality?.message}
                    className='mb-3'
                  />
                )}
              />
              <Controller
                name='type'
                control={form.control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label='Type'
                    placeholder='Select an image type'
                    data={imgTypes}
                    className='mb-6'
                  />
                )}
              />
              <div className='max-w-max mx-auto flex items-center flex-wrap gap-y-4'>
                <Button type='submit' disabled={!file}>
                  Compress Image
                </Button>
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
                <Button className='ml-3' onClick={downloadCompressedImage}>
                  Download
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>

        {file ? (
          <div className='flex justify-between flex-wrap items-center gap-4'>
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
            {compressedFile ? (
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
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CanvasCompressor;
