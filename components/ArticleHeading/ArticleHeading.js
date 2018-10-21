import React from 'react';
import { shape } from 'prop-types';
import Link from 'next/link';
import { imageUrlFor } from 'utils/imageLoader';
import './ArticleHeading.scss';

export default function ArticleHeading({ article }) {
  return (
    <article className="ArticleHeading">
      <div className="article__header">
        <Link href={`/${article.slug.current}`}>
          <a className="header-image__link">
            <img className="header-image" src={imageUrlFor(article.image)} alt="article" />
          </a>
        </Link>
      </div>
      <div className="article__title">
        <h2 className="title__heading">
          <Link href={`/${article.slug.current}`}>
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
          <Link href={`/${article.slug.current}`}>
            <a className="active">
              <span>Read more &#xbb;</span>
            </a>
          </Link>
        </div>
      </article>
    </article>
  );
}

ArticleHeading.propTypes = {
  article: shape({}).isRequired
};
