import React, { FC } from 'react';
import { Player } from 'react-tuby';

import './galleryVideo.scss';

interface GalleryVideoProps {
  assets: any[];
}

const GalleryVideo: FC<GalleryVideoProps> = ({ assets }) => {
  return (
    <div className="galleryVideo">
      {assets.length > 0 &&
        assets.map((asset, index) => (
          <div className="galleryVideo-item" key={index}>
            <Player src={asset.url} keyboardShortcut={false} />
          </div>
        ))}
    </div>
  );
};

export default GalleryVideo;
