import React, { PureComponent } from 'react';
import { func, arrayOf, shape } from 'prop-types';
import TrendingArticles from 'containers/TrendingArticles';
import ArticleHeading from 'components/ArticleHeading/index';
// import AboutAuthor from 'components/AboutAuthor';
import GetInTouch from 'components/GetInTouch';
import styles from './Articles.scss';

export default class Articles extends PureComponent {
  render() {
    const { articles, registerGetInTouchClick } = this.props;
    return (
      <section className="articles">
        <div className="articles__layout">
          <div className="articles__list">
            {articles.map(article => (
              <div key={article.slug.current}>
                <ArticleHeading article={article} />
              </div>
            ))}
          </div>
          <div className="articles__sidebar">
            <GetInTouch onGetInTouchClick={registerGetInTouchClick} />
            <TrendingArticles />
          </div>
        </div>
        <style jsx>{styles}</style>
      </section>
    );
  }
}

Articles.propTypes = {
  articles: arrayOf(shape({})).isRequired,
  registerGetInTouchClick: func.isRequired
};
