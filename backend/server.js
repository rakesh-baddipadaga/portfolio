const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes=require('./routes/Profile');
const imageRoutes=require('./routes/imagerouter');
const vcardRoutes=require('./routes/vcardroutes');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));




app.use('/api/profile', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/vcard',vcardRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






















// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('./routes/user');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// const uri= 'mongodb+srv://rakesh:rakesh@cluster1.gxbsder.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// app.use('/api/user', userRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

