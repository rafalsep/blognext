import { fetchArticle } from 'services/article-service';
import { FETCH_ARTICLE_RESPONDED } from 'events/article-events';
import { selectArticleName } from 'common/article-name-selector';

export function fetchArticleAction() {
  return (dispatch, getState) =>
    fetchArticle(selectArticleName()(getState())).then(article => {
      dispatch({ type: FETCH_ARTICLE_RESPONDED, article });
    });
}
