import React, { memo } from 'react';
import { shape } from 'prop-types';
import { imageUrlFor } from 'utils/imageLoader';
import { Link } from '../../../routes';
import styles from './ArticleHeading.scss';

const ArticleHeading = ({ article }) => (
  <article className="ArticleHeading">
    <div className="article__header">
      <Link route="articlePage" articleName={article.slug.current} prefetch>
        <a className="header-image__link">
          <img className="header-image" src={imageUrlFor(article.image)} alt="article" />
        </a>
      </Link>
    </div>
    <div className="article__title">
      <h2 className="title__heading">
        <Link route="articlePage" articleName={article.slug.current} prefetch>
          <a className="title__link">{article.title}</a>
        </Link>
      </h2>
      <div className="title__timestamp">
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        <span> by Rafal Szczepankiewicz</span>
      </div>
    </div>
    <article className="article__body">
      <div>
        <p>{article.teaser}</p>
        <Link route="articlePage" articleName={article.slug.current} prefetch>
          <a className="active">
            <span>Read more &#xbb;</span>
          </a>
        </Link>
      </div>
    </article>
    <style jsx>{styles}</style>
  </article>
);

ArticleHeading.propTypes = {
  article: shape({}).isRequired
};

export default memo(ArticleHeading);
