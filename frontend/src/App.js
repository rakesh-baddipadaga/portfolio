import React, { useState, useEffect } from 'react';
import AboutMe from './components/Aboutme';
import Links from './components/links';
import Contact from './components/contactme';
import Loader from './components/Loader';
import getData from './dataservice';
import './App.css';
import ProfileImage from './components/photo';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import IosShareIcon from '@mui/icons-material/IosShare';
import QRCode from 'react-qr-code';


const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);


  useEffect(() => {
    if (data) {
      // Set the document title to the user's name
      document.title = data.name;

      // Set the favicon to the user's profile picture
      const setFavicon = (url) => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = url;
      };

      setFavicon(`https://portfolio-backend1-eta.vercel.app/api/images/${data.profilePictureId}`);
    }
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }


  const downloadVCard =async () => {

    try {
      const response = await fetch('https://portfolio-backend1-eta.vercel.app/api/vcard/download-vcard');
      if (response.ok) {
        const vcardData = await response.text();
        const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contact.vcf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Failed to download vCard');
      }
    } catch (error) {
      console.error('Error downloading vCard:', error);
    }

  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Digital Business Card',
        url: window.location.href
      }).catch(error => console.error('Error sharing:', error));
    } else {
      console.error('Web Share API is not supported in your browser.');
    }
  };

  const handleQRCodeClick = () => {
    setShowQR(true);
  };

  const closeQRCode = () => {
    setShowQR(false);
  };


  return (
       <div className="app">
        <div className='card1'>
        <div className="photo-and-info">
          <ProfileImage imageId={data.profilePictureId} />
        {/* {data.profilePictureId && <img src={`http://localhost:5000/api/image/${data.profilePictureId}`} alt="Profile" />} */}

          <div className='name'>{data.name}</div>
          <div className="role">{data.role}</div>
          <div className="icon-container">
              <a href={`tel:${data.contact.phone}`} className="icon">
                <PhoneAndroidIcon />
              </a>
              <a href={`mailto:${data.contact.email}`} className="icon">
                <MailOutlinedIcon />
              </a>
              <a href={`https://wa.me/${data.contact.phone}`} className="icon" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.contact.address)}`} className="icon" target="_blank" rel="noopener noreferrer">
                <LocationOnOutlinedIcon />
              </a>
            </div>
        </div>
        </div>
      <div className="card">
        <AboutMe data={data.aboutMe} />
      </div>
      <div className="card">
        <Contact contact={data.contact} />
      </div>
      <div className="card">
        <Links links={data.links} />
      </div>
      <div className="bottom-buttons">
        <div className='left-buttons'>
        <button  className="left-button" onClick={handleQRCodeClick}><QrCode2Icon /></button>
        <button className='left-button' onClick={handleShare}><IosShareIcon /></button>
        </div>
        <button onClick={downloadVCard} className="right-button">Add to Contact</button>
      </div>
      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <div className="photo-and-info">
              <ProfileImage imageId={data.profilePictureId} />
              <div className='name'>{data.name}</div>
              <div className="role">{data.role}</div>
            </div>
            <QRCode value={window.location.href} />
            <div className="wallet-buttons">
              <button className="wallet-button">Add to Google Wallet</button>
              <button className="wallet-button">Add to Apple Wallet</button>
              <button className="wallet-button">Add to Gallery</button>
            </div>
            <button className="close-button" onClick={closeQRCode}>x</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default App;
