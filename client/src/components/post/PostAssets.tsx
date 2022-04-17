import React, { FC } from 'react';
import { assetsType } from 'shared/types';
import './postassets.scss';

interface PostAssetsProps {
  assets: assetsType[];
}

const PostAssets: FC<PostAssetsProps> = ({ assets }) => {
  console.log(assets);
  if (assets?.length < 3) {
    return (
      <div className="wrapper-1">
        {assets?.map(
          (asset, index) =>
            asset.url !== undefined && (
              <div key={index} className="wrapper-1__item">
                <div
                  className="wrapper-1__item__image"
                  style={{ backgroundImage: `url("${asset.url}")` }}
                ></div>
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
          <img src={assets[0].url} alt="" />
        </div>
        <div className="wrapper-3__item2">
          {assets?.map((asset, index) => (
            <>
              {index !== 0 && index <= 3 && (
                <div className="wrapper-3__item" key={index}>
                  <img src={asset.url} alt="" />
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
};

export default PostAssets;
