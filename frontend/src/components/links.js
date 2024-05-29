import React from 'react';
import linkedinicon from '../assets/linkedin.png';
import instaicon from '../assets/instagram.png';
import LinkIcon from '@mui/icons-material/Link';  // Importing Material UI Link icon
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';  // Importing Material UI Arrow icon

const Links = ({ links }) => (
  <div className="links-container">
    <div className="links">
      <h2>Find me Here</h2>
      {links.filter(link => link.name !== 'Company Website').map(link => (
        <a href={link.url} key={link.name} className="link-item" target="_blank" rel="noopener noreferrer">
          <img src={link.name === 'LinkedIn' ? linkedinicon : instaicon} alt={link.name} />
          <span>{link.name}</span>
          <span className="arrow"><ArrowForwardIosIcon /></span>
        </a>
      ))}
    </div>
    <div className="company-card">
      <h2>Links</h2>
      {links.filter(link => link.name === 'Company Website').map(link => (
        <a href={link.url} key={link.name} className="link-item company-link" target="_blank" rel="noopener noreferrer">
          <LinkIcon />
          <span>{link.name}</span>
          <span className="arrow"><ArrowForwardIosIcon /></span>
        </a>
      ))}
    </div>
  </div>
);

export default Links;
