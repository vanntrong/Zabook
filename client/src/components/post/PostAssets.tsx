import React, { FC } from 'react';
import { assetsType } from 'shared/types';
import './postassets.scss';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
import ImagePlayer from 'components/player/imagePlayer/ImagePlayer';

interface PostAssetsProps {
  assets: assetsType[];
}

const PostAssets: FC<PostAssetsProps> = React.memo(({ assets }) => {
  if (assets?.length < 3) {
    return (
      <div className="wrapper-1">
        {assets?.map(
          (asset, index) =>
            asset.url !== undefined && (
              <div key={index} className="wrapper-1__item">
                {asset.media_type === 'image' && (
                  <ImagePlayer src={asset.url} className="wrapper-1__item__image" />
                )}
                {asset.media_type === 'video' && (
                  <Player src={asset.url} keyboardShortcut={false} />
                )}
              </div>
            )
        )}
      </div>
    );
  }
  if (assets?.length >= 3) {
    return (
      <div className="wrapper-3">
        <div className="wrapper-3__item1">
          {assets[0].media_type === 'image' && <ImagePlayer src={assets[0].url} />}
          {assets[0].media_type === 'video' && (
            <Player src={assets[0].url} keyboardShortcut={false} />
          )}
        </div>
        <div className="wrapper-3__item2">
          {assets?.map((asset, index) => (
            <>
              {index !== 0 && index <= 3 && (
                <div className="wrapper-3__item" key={index}>
                  {asset.media_type === 'image' && <ImagePlayer src={asset.url} />}
                  {asset.media_type === 'video' && (
                    <Player src={asset.url} keyboardShortcut={false} />
                  )}
                  {assets.length > 4 && index === 3 && (
                    <div className="bonus_count">
                      <span>+ {assets.length - 4}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }
  return null;
});

export default PostAssets;
