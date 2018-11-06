import { FETCH_ARTICLE_RESPONDED, FETCH_ARTICLES_RESPONDED, FETCH_TRENDING_ARTICLES_RESPONDED } from 'events/article-events';
import { ADD_COMMENT_RESPONDED } from 'events/comment-events';
import blogReducer from '../blog-reducer';

describe('blog-reducer', () => {
  test('should validate FETCH_ARTICLES_RESPONDED', () => {
    const state = blogReducer({ articles: undefined }, { type: FETCH_ARTICLES_RESPONDED, articles: [{ _id: '1' }] });

    expect(state.articles).toEqual([{ _id: '1' }]);
  });

  test('should validate FETCH_ARTICLE_RESPONDED', () => {
    const state = blogReducer({ articles: [{ _id: '1' }] }, { type: FETCH_ARTICLE_RESPONDED, article: { _id: '1', content: 'test article' } });

    expect(state.articles).toEqual([{ _id: '1', content: 'test article' }]);
  });

  test('should validate ADD_COMMENT_RESPONDED', () => {
    const state = blogReducer({ articles: [{ _id: '1' }] }, { type: ADD_COMMENT_RESPONDED, updatedArticle: { _id: '1', content: 'test article' } });

    expect(state.articles).toEqual([{ _id: '1', content: 'test article' }]);
  });

  test('should validate FETCH_TRENDING_ARTICLES_RESPONDED', () => {
    const state = blogReducer(undefined, { type: FETCH_TRENDING_ARTICLES_RESPONDED, trendingArticles: [{ _id: '1' }] });

    expect(state.trendingArticles).toEqual([{ _id: '1' }]);
  });
});
