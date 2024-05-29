const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();
const vCard = require('vcards-js');



router.get('/download-vcard', async (req, res) => {
    try {
      const profile = await Profile.findOne(); 

      const vcard = vCard();
      vcard.firstName=profile.name;
      vcard.workPhone = profile.contact.phone;
      vcard.email = profile.contact.email;
      vcard.homeAddress.label = 'Home Address';
      vcard.homeAddress.street = profile.contact.address;
      vcard.title = profile.role;
      vcard.note = profile.aboutMe.description;
      
      if (profile.links && profile.links.length > 0) {
        profile.links.forEach(link => {
          vcard.url = link.url;
        });
      }

      const filename = 'contact.vcf';

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
      res.send(vcard.getFormattedString());
    } catch (error) {
      console.error('Error generating vCard:', error);
      res.status(500).send('Error generating vCard');
    }
  });

module.exports=router;