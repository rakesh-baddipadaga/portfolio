import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const ProfileImage = ({ imageId }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (imageId) {
      fetchImage(imageId);
    }
  }, [imageId]);

  console.log("hello");
  const fetchImage = async (id) => {
    console.log(id);
    console.log("hello");
    try {
      const response = await fetch(`http://localhost:5000/api/image/${id}`);
      console.log(id);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
      setImageSrc(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div className="hexagon-wraper">
      {/* {imageSrc && <img src={imageSrc} alt="Profile" />} */}
      {imageSrc ? (
        <img src={imageSrc} alt="Profile" className="hexagon-image" />
      ) : (
        <p><Loader /></p>
      )}
    </div>
  );
};

export default ProfileImage;
