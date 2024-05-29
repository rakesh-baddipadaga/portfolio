const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Profile = require('../models/profile'); // Ensure the path to the model is correct

dotenv.config();

async function main() {
  const uri = process.env.MONGO_URI; // Your MongoDB Atlas connection string
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB using MongoClient for GridFS
    await client.connect();
    const database = client.db('test'); // Replace with your database name
    const bucket = new GridFSBucket(database, { bucketName: 'images' });

    // Path to the image you want to upload
    const imagePath = 'C:\\Users\\DEEKSHITH\\Desktop\\R_Loan_docs\\Rakesh\\pp.jpg'; // Replace with the path to your image

    // Function to upload image to GridFS
    const uploadImage = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(path.basename(imagePath));
        const imageReadStream = fs.createReadStream(imagePath);

        imageReadStream.pipe(uploadStream)
          .on('error', (error) => {
            console.error('Error uploading image:', error);
            resolve(null); // Resolve with null if image upload fails
          })
          .on('finish', () => {
            resolve(uploadStream.id);
          });
      });
    };

    // Attempt to upload the image and get the image ID (or null if failed)
    const profilePictureId = await uploadImage();

    if (profilePictureId) {
      console.log(`Image uploaded with _id: ${profilePictureId}`);
    } else {
      console.log('Image upload failed, proceeding without profile picture.');
    }

    // Data to be inserted into the profile collection
    const data = {
      name:"Rakesh Baddipadaga",
      aboutMe: {
        description: "Hi, this is Rakesh a seasoned software engineer with expertise in developing user friendly and scalable applications using mern(MongoDB Express.js React.js Node.js,)stack.A tech enthusiast eager to learn more and grow in challenging environment."
      },
      profilePictureId: profilePictureId, // Store the image ID in the document (or null if upload failed)
      role:"Sofware Engineer(FullStack)",
      links: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/rakesh-baddipadaga"
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/rakesh_reddy2/"
        },
        {
          name: "Company Website",
          url: "https://github.com/rakesh-baddipadaga"
        }
      ],
      contact: {
        phone: "+91 8897348402",
        email: "rakeshbaddipadaga8@gmail.com",
        address: "Goplapur,Hanamkonda,Hanamkonda,Telangana,506009"
      }
    };

    // Save profile data to MongoDB
    const profile = new Profile(data);
    const result = await profile.save();
    console.log(`New profile document inserted with _id: ${result._id}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close connections
    await client.close();
    mongoose.connection.close();
  }
}

main().catch(console.error);





























// const { MongoClient } = require('mongodb');
// require('dotenv').config();

// async function main() {
//     const uri = process.env.MONGO_URI; // Replace with your MongoDB Atlas connection string

//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();

//         const database = client.db('test'); // Replace with your database name

//         const data = {
//             aboutMe: {
//                 description: "Hi, Amogh this side from STACKLAB. As a Business Development Analyst at STACKLAB"
//             },
//             links: [
//                 {
//                     name: "LinkedIn",
//                     url: "https://linkedin.com/in/rakesh-baddipadaga"
//                 },
//                 {
//                     name: "Instagram",
//                     url: "https://"
//                 },
//                 {
//                     name: "Company Website",
//                     url: "https://n"
//                 }
//             ],
//             contact: {
//                 phone: "+9187898912",
//                 email: "ro@stsnsab.in",
//                 address: "Office No 8, 2nd Floor"
//             }
//         };

//         const collection = database.collection('profiles'); // Replace with your collection name
//         const result = await collection.insertOne(data);
//         console.log(`New document inserted with _id: ${result.insertedId}`);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);












































// const mongoose = require('mongoose');
// const User = require('../models/user');

// const uri= 'mongodb+srv://rakesh:rakesh@cluster1.gxbsder.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'


// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// const userData = {
//     name: 'John Doe',
//     bio: 'Full-stack developer with a passion for creating beautiful and functional web applications.',
//     // profilePicture: 'https://example.com/profile.jpg',
//     skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
//     projects: [
//         {
//             title: 'Project One',
//             description: 'A web application for managing tasks.',
//             link: 'https://github.com/johndoe/project-one'
//         },
//         {
//             title: 'Project Two',
//             description: 'A mobile app for tracking fitness activities.',
//             link: 'https://github.com/johndoe/project-two'
//         }
//     ]
// };

// const insertData = async () => {
//     try {
//         await User.deleteMany({});
//         await User.create(userData);
//         console.log('Data inserted successfully');
//     } catch (err) {
//         console.error('Error inserting data:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// insertData();
