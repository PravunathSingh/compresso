import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import cors from 'cors';
import cloudinary from 'cloudinary';

const app = express();

cloudinary.v2.config({
  cloud_name: 'dy4gkixf2',
  api_key: '376243223673282',
  api_secret: 'v1Fm_7RfhZ2n4ViX14CGS7LLdtY',
});

app.use(
  cors({
    origin: '*',
  })
);

const port = process.env.PORT || 5000;
console.log('port', port);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static('./uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  fs.access('./uploads', (err) => {
    if (err) {
      fs.mkdirSync('./uploads');
    }
  });

  const { file } = req;
  const { buffer, originalname } = file as Express.Multer.File;

  const timeStamp = new Date().toISOString();

  const fileName = `${timeStamp}-${originalname}.webp`;

  try {
    await sharp(buffer).webp({ quality: 50 }).toFile(`./uploads/${fileName}`);
    const resImage = await cloudinary.v2.uploader.upload(
      `./uploads/${fileName}`,
      {
        public_id: `${fileName}`,
      }
    );

    const imageUrl = resImage.secure_url;
    const url = cloudinary.v2.image(imageUrl, {
      width: 500,
      height: 500,
      crop: 'cover',
      quality: 'eco',
    });

    res.status(200).json({ imageUrl, url });
  } catch (error) {
    console.log(error);
  }
});

// app.post('/api/cloudinary', upload.single('image'), async (req, res) => {
//   fs.access('./uploads', (err) => {
//     if (err) {
//       fs.mkdirSync('./uploads');
//     }
//   });

//   const { file } = req;
//   const { buffer, originalname } = file as Express.Multer.File;

//   const timeStamp = new Date().toISOString();

//   const fileName = `${timeStamp}-${originalname}.webp`;

//   // const resImage = await cloudinary.v2.uploader.upload(`/uploads/${fileName}`, {
//   //   public_id: `${fileName}`,
//   // });
//   // const imageUrl = resImage.secure_url;
//   // const url = cloudinary.v2.image(imageUrl, {
//   //   width: 500,
//   //   height: 500,
//   //   crop: 'cover',
//   //   quality: 'eco',
//   // });

//   // res.status(200).json({ imageUrl, url });

//   try {
//     const resImage = await cloudinary.v2.uploader.upload(
//       `/uploads/${fileName}`,
//       {
//         public_id: `${fileName}`,
//       }
//     );
//     const imageUrl = resImage.secure_url;
//     const url = cloudinary.v2.image(imageUrl, {
//       width: 500,
//       height: 500,
//       crop: 'cover',
//       quality: 'eco',
//     });

//     res.status(200).json({ imageUrl, url });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
