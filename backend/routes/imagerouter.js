const express = require('express');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const router = express.Router();

mongoose.connection.on('connected', () => {
  const database = mongoose.connection.db;
  const bucket = new GridFSBucket(database, { bucketName: 'images' });

  router.get('/:id', async (req, res) => {
    try {
      const fileId = new mongoose.Types.ObjectId(req.params.id);
      const downloadStream = bucket.openDownloadStream(fileId);

      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });

      downloadStream.on('end', () => {
        res.end();
      });

      downloadStream.on('error', (error) => {
        console.error('Error streaming image:', error);
        res.status(404).send('Image not found');
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

module.exports = router;




























// const express = require('express');
// const mongoose = require('mongoose');
// const { GridFSBucket } = require('mongodb');

// const router = express.Router();

// const database = mongoose.connection.db;
// const bucket = new GridFSBucket(database, { bucketName: 'images' });

// // Endpoint to fetch image by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const fileId = new mongoose.Types.ObjectId(req.params.id);
//     const downloadStream = bucket.openDownloadStream(fileId);

//     // res.set('Content-Type', 'image/jpeg');

//     downloadStream.on('data', (chunk) => {
//       res.write(chunk);
//     });

//     downloadStream.on('end', () => {
//       res.end();
//     });

//     downloadStream.on('error', (error) => {
//       console.error('Error streaming image:', error);
//       res.status(404).send('Image not found');
//     });
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// module.exports = router;
