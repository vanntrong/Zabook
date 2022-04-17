import React, { FC } from 'react';
import './galleryImage.scss';

interface GalleryImageProps {
  images: any[];
}

const GalleryImage: FC<GalleryImageProps> = ({ images }) => {
  return (
    <div className="gallery">
      {images.map(
        (image, index) =>
          image && (
            <div className="gallery-item" key={index}>
              <img src={image} alt="" />
            </div>
          )
      )}
    </div>
  );
};

export default GalleryImage;
