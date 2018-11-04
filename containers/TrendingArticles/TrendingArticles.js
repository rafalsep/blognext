import React, { PureComponent } from 'react';
import { arrayOf, shape, func } from 'prop-types';
import Link from 'components/Link';
import { imageUrlFor } from 'utils/imageLoader';
import styles from './TrendingArticles.scss';

export default class TrendingArticles extends PureComponent {
  componentDidMount() {
    this.props.fetchTrendingArticles();
  }

  render() {
    return (
      <div className="TrendingArticles">
        <div className="trending-articles__header">Trending articles</div>
        <div className="trending-articles__body">
          <nav>
            {this.props.trendingArticles.map(trendingArticle => (
              <Link key={trendingArticle.slug.current} href={`/post/${trendingArticle.slug.current}`} prefetch className="trending-articles__link">
                <span className="trending-articles__image">
                  <img
                    src={imageUrlFor(trendingArticle.image)
                      .ignoreImageParams()
                      .width(250)
                      .height(182)}
                    alt="article heading"
                  />
                </span>
                <span className="trending-articles__title">{trendingArticle.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

TrendingArticles.propTypes = {
  trendingArticles: arrayOf(shape({})).isRequired,
  fetchTrendingArticles: func.isRequired
};
