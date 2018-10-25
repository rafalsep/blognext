import { selectArticle } from '../article-selector';

describe('article-selector', () => {
  test('should select article', () => {
    const article = selectArticle()({
      route: { location: '/test-article?from=10' },
      blog: { articles: [{ slug: { current: 'test-article' }, content: 'test-article-content' }] }
    });

    expect(article).toEqual({ slug: { current: 'test-article' }, content: 'test-article-content' });
  });
});
