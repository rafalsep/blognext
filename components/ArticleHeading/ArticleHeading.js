import React, { memo } from 'react';
import { shape } from 'prop-types';
import Link from 'components/Link';
import { imageUrlFor } from 'utils/imageLoader';
import styles from './ArticleHeading.scss';

const ArticleHeading = ({ article }) => (
  <article className="ArticleHeading">
    <div className="article__header">
      <Link href={`/post/${article.slug.current}`} prefetch className="header-image__link">
        <img className="header-image" src={imageUrlFor(article.image)} alt="article" />
      </Link>
    </div>
    <div className="article__title">
      <h2 className="title__heading">
        <Link href={`/post/${article.slug.current}`} prefetch className="title__link">
          {article.title}
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
        <Link href={`/post/${article.slug.current}`} prefetch className="active">
          <span>Read more &#xbb;</span>
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
