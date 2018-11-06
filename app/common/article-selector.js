import { createSelector } from 'reselect';
import { selectArticleName } from 'common/article-name-selector';

const selectArticles = () => state => state.blog.articles;

const selectArticle = () =>
  createSelector(state => state.blog.articles, selectArticleName(), (articles, articleName) => articles.find(article => article.slug.current === articleName && article.content !== undefined));

export { selectArticles, selectArticle };
