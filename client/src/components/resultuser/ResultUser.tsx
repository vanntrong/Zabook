import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import React from 'react';
import './resultuser.scss';

const ResultUser = () => {
  return (
    <div className="result">
      <div className="result-info">
        <Avatar
          src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/277798424_156608650115676_2977584561916757065_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=8631f5&_nc_ohc=F7GTpWWnu1EAX_9uE0A&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT8yO_Y0AGvIvmi39Er1PDDOEeskdtViyJwobMcCQyJabQ&oe=625DEC87"
          alt=""
        />
        <div className="result-info__name">Anti Độ Mixi</div>
      </div>
      <div className="result-action">
        <CloseIcon fontSize="small" htmlColor="#666" />
      </div>
    </div>
  );
};

export default ResultUser;
