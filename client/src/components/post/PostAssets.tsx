import React, { FC } from 'react';
import './postassets.scss';

interface PostAssetsProps {
  assets: string[];
}

const PostAssets: FC<PostAssetsProps> = ({ assets }) => {
  if (assets?.length < 3) {
    return (
      <div className="wrapper-1">
        {assets?.map((asset, index) => (
          <div key={index} className="wrapper-1__item">
            <img src={asset} alt="" />
          </div>
        ))}
      </div>
    );
  }
  if (assets?.length >= 3) {
    return (
      <div className="wrapper-3">
        <div className="wrapper-3__item1">
          <img src={assets[0]} alt="" />
        </div>
        <div className="wrapper-3__item2">
          {assets?.map((asset, index) => (
            <>
              {index !== 0 && index <= 3 && (
                <div className="wrapper-3__item" key={index}>
                  <img src={asset} alt="" />
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
