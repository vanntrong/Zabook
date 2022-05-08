import React, { FC } from 'react';
import './galleryImage.scss';

interface GalleryImageProps {
  assets: any[];
}

const GalleryImage: FC<GalleryImageProps> = ({ assets }) => {
  return (
    <div className="gallery">
      {assets.map(
        (asset, index) =>
          asset && (
            <div className="gallery-item" key={index}>
              <img src={asset.url} alt="" />
            </div>
          )
      )}
    </div>
  );
};

export default GalleryImage;
