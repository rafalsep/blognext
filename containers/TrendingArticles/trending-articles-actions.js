import { fetchTrendingArticles } from 'services/article-service';
import { FETCH_TRENDING_ARTICLES_RESPONDED } from 'events/article-events';

export function fetchTrendingArticlesAction() {
  return dispatch =>
    fetchTrendingArticles().then(trendingArticles => {
      dispatch({ type: FETCH_TRENDING_ARTICLES_RESPONDED, trendingArticles });
    });
}
