import React from 'react';

const Contact = ({ contact }) => (
  <div className="contact">
    <h2>Contact Us</h2>
    <h3>Call : </h3>
      {contact.phone}
    <h3>Email: </h3>
    {contact.email}
    <h3>Address: </h3> 
      {contact.address}
  </div>
);

export default Contact;

