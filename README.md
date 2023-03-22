# Compresso
Compresso is a webapp created to help you understand how image compression works. It allows you to upload an image and see how it is compressed using different approaches. It also allows you to see the effect of different compression parameters on the image quality.

## Image compression on the web:

Uploading files, especially images, is an integral part of most applications these days. 

Large images however can take a long time to upload and to store these images on a cloud storage is another challenge (infinite storage is a myth, kind of).
The easiest way to overcome this is to compress the images before uploading them (client side compression) or before storing them (server side compression).

While talking about image compression it is important to note that are 2 kinds of compression:

- Lossy compression
- Lossless compression

Without going into much detail of these, the primary difference between them however is:

| Lossy | Lossless |
| --- | --- |
| Lossy reduces file size by permanently removing some of the original data|  Lossless reduces file size by removing unnecessary metadata. |

**Most of the compression done for this application is lossy.**

### Client side compression
Compressing the images directly in the browser before uploading to the server.
The two major ways to achieve this are:

- Using raw HTML Canvas
- Using a image compression library like [`compressorjs`]('https://github.com/fengyuanchen/compressorjs')

We will be preferring using `compressorjs` since it allows for greater fine tuning for image compression.

The main advantages of using client side compression are:

- Decreasing image size means sending lesser data to the server resulting in faster uploads.
- Processing is done at the client side saving you some processing cycles at the server.
- Fine control over the image resolution and image quality.
- Supports all major image formats

The main caveats of client side compression are:

- lossless compression is not possible on browser
- uses Canvas api , will work diffrently on each browser
- need good system otherwise compression process will make browser laggy 

### Server side compression
Compressing the images on the server before storing it in a DB or a cloud storage.
The two approaches used to achieve this are:

- Uploading raw image directly and then compressing it using [Multer]('https://www.npmjs.com/package/multer') and [Sharp]('https://www.npmjs.com/package/sharp')
- Compressing image on the client side using compressorjs and then uploading that compressed image for further compression on the server.

The advantages for server side compression are:

- offloads complex compression, which might make the browser laggy, to dedicated servers.
- helpful for people with a small bandwidth but powerful computers and recent browser to upload large images.

The main caveats to be considered are:

- The image compression on the server side needs to be done on a different thread so that the operations on main thread are not blocked.
- Doing compression directly on the server without doing it first on the client should be avoided as uploading time would be huge in this case.
- Total compression achieved on the server after compression on the client side first isn't that much in comparison.
