import React from 'react';
import { Link } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="mainWrapper">
        <div className="notFoundPage-wrapper">
          <div className="notFoundPage-img">
            <img src="/assets/images/bg-404.png" alt="" />
          </div>
          <h1 className="notFoundPage-title">Oops! It looks like you're lost.</h1>
          <p className="notFoundPage-desc">
            The page you're looking for isn't available. Try to search again or use the go to.
          </p>
          <Link to="/" className="notFoundPage-redirect">
            <button>HOME PAGE</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
