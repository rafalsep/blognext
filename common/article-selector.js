import { createSelector } from 'reselect';
import { selectArticleName } from 'common/article-name-selector';

const selectArticle = () =>
  createSelector(state => state.getIn(['blog', 'articles']), selectArticleName(), (articles, articleName) =>
    articles.find(article => article.slug.current === articleName && article.content !== undefined)
  );

export { selectArticle };
