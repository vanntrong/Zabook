import ImagePlayer from 'components/player/imagePlayer/ImagePlayer';
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
              <ImagePlayer src={asset.url} />
            </div>
          )
      )}
    </div>
  );
};

export default GalleryImage;
