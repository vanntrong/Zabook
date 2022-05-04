import React, { FC } from 'react';
import { assetsType } from 'shared/types';
import './postassets.scss';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';

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
                  <img src={asset.url} alt="" className="wrapper-1__item__image" />
                )}
                {asset.media_type === 'video' && <Player src={asset.url} />}
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
          {assets[0].media_type === 'image' && <img src={assets[0].url} alt="" />}
          {assets[0].media_type === 'video' && <Player src={assets[0].url} />}
        </div>
        <div className="wrapper-3__item2">
          {assets?.map((asset, index) => (
            <>
              {index !== 0 && index <= 3 && (
                <div className="wrapper-3__item" key={index}>
                  {asset.media_type === 'image' && <img src={asset.url} alt="" />}
                  {asset.media_type === 'video' && <Player src={asset.url} />}
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
