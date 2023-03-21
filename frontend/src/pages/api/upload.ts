import multer from 'multer';
// import { CorsOptions } from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
// import Cors from 'cors';
import fs from 'fs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const cors = Cors({
//   methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
// });

export default function handleImageUpload(
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    fs.access('./public/uploads', (err) => {
      if (err) {
        fs.mkdirSync('./public/uploads');
      }
    });

    const { buffer, originalname } = req?.file as Express.Multer.File;
    const timeStamp = new Date().toISOString();
    const fileName = `${timeStamp}-${originalname}.webp`;

    await sharp(buffer)
      .webp({ quality: 50 })
      .toFile(`./public/uploads/${fileName}`);

    const imageUrl = `
      https://compresso.vercel.app/uploads/${fileName}
    `;

    // convert the compressed image size to kb and mb
    // const compressedImageSize = compressedImage.length / 1024 / 1024;

    res.status(200).json({ imageUrl });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
