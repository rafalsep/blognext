import React, { PureComponent } from 'react';
import { shape } from 'prop-types';
import ArticleContent from 'components/ArticleContent';
import ShareArticle from 'components/ShareArticle';
import Comments from 'components/Comments';
import AddComment from 'containers/AddComment';
import './Article.scss';

export default class Article extends PureComponent {
  render() {
    const { article } = this.props;

    return (
      <div className="Article">
        <div className="article__content">{<ArticleContent article={article} />}</div>
        <ShareArticle />
        {article.comments && <Comments comments={article.comments} commentsCount={article.commentsCount} />}
        <h3 className="article__reply_header">Leave a Reply</h3>
        <AddComment />
      </div>
    );
  }
}

Article.propTypes = {
  article: shape({}).isRequired
};
