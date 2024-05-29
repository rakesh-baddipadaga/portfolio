const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Profile schema
const ProfileSchema = new Schema({
  name:{type:String, reuired:true},
  aboutMe: {
    description: { type: String, required: true }
  },
  profilePictureId: { type: Schema.Types.ObjectId, ref: 'fs.files' }, 
  role:{type:String, required:true},
  links: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  }
});

// Create the Profile model
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
