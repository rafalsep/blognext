import React, { memo } from 'react';
import { APP_URL } from 'constants/seo';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon
} from 'react-share';
import styles from './ShareArticle.scss';

const ShareArticle = () => {
  const articleUrl = APP_URL;

  return (
    <div className="ShareArticle">
      <h2 className="share-article__title">Share</h2>
      <ul className="share-article__list">
        <li className="share-article__item" title="Share on Facebook">
          <FacebookShareButton url={articleUrl}>
            <FacebookIcon size={40} />
          </FacebookShareButton>
        </li>
        <li className="share-article__item" title="Share on Google+">
          <GooglePlusShareButton url={articleUrl}>
            <GooglePlusIcon size={40} />
          </GooglePlusShareButton>
        </li>
        <li className="share-article__item" title="Share on LinkedIn">
          <LinkedinShareButton url={articleUrl}>
            <LinkedinIcon size={40} />
          </LinkedinShareButton>
        </li>
        <li className="share-article__item" title="Share on Twitter">
          <TwitterShareButton url={articleUrl}>
            <TwitterIcon size={40} />
          </TwitterShareButton>
        </li>
        <li className="share-article__item" title="Share on Reddit">
          <RedditShareButton url={articleUrl}>
            <RedditIcon size={40} />
          </RedditShareButton>
        </li>
        <li className="share-article__item" title="Share via Email">
          <EmailShareButton url={articleUrl}>
            <EmailIcon size={40} />
          </EmailShareButton>
        </li>
      </ul>
      <style jsx>{styles}</style>
    </div>
  );
};

export default memo(ShareArticle);
