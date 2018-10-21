import React from 'react';
import { shape } from 'prop-types';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import sanity from 'utils/sanityProvider';

import './ArticleContent.scss';

const serializers = {
  types: {
    // eslint-disable-next-line react/prop-types
    code: ({ node }) => (
      <pre style={{ backgroundColor: 'blue' }} data-language={node.language}>
        <code>{node.snippet}</code>
      </pre>
    )
  },
  marks: {
    // eslint-disable-next-line react/prop-types
    pre: ({ children }) => (
      <pre style={{ backgroundColor: 'red' }} data-language="javascript">
        {children}
      </pre>
    )
  }
};

const ArticleContent = ({ article }) => (
  <div className="ArticleContent">
    <article className="article-content__header">
      <h1 className="header__title">{article.title}</h1>
      <Link href="/">
        <a className="header__link">
          <span className="back-arrow">&#171;</span> <span>View all articles</span>
        </a>
      </Link>
    </article>
    <section className="article-content__body">
      <BlockContent blocks={article.content} serializers={serializers} dataset={sanity.clientConfig.dataset} projectId={sanity.clientConfig.projectId} />
    </section>
  </div>
);

ArticleContent.propTypes = {
  article: shape({}).isRequired
};

export default ArticleContent;
