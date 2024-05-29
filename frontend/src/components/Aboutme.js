import React from 'react';

const AboutMe = ({ data }) => (
  <div className="about-me">
    <h2>About Me</h2>
    <p>{data.description}</p>
  </div>
);

export default AboutMe;
