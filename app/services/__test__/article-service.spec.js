import { stub } from 'sinon';
import sanity from 'utils/sanityProvider';
import { fetchArticle, fetchArticles } from '../article-service';

describe('article-service', () => {
  test('should fetch articles', () => {
    stub(sanity, 'fetch').returns(['article1', 'article2']);

    const articles = fetchArticles();

    expect(articles).toEqual(['article1', 'article2']);
  });

  test('should fetch article', () => {
    stub(sanity, 'fetch').returns(Promise.resolve([{ comments: createComments() }]));

    const articlePromise = fetchArticle('test-article');

    expect(sanity.fetch.args[0][0]).toContain('test-article');
    return articlePromise.then(article => {
      expect(article.comments).toEqual([{ replies: [{ replies: [{}] }] }, {}]);
      expect(article.commentsCount).toBe(4);
    });
  });

  function createComments() {
    return [{ replies: [{ replies: [{}] }] }, {}];
  }

  afterEach(() => {
    sanity.fetch.restore();
  });
});
