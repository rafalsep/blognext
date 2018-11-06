import { selectArticleName } from '../article-name-selector';

describe('article-names-selector', () => {
  test('should select article name', () => {
    const articleName = selectArticleName()({ route: { location: '/post/test-article' } });

    expect(articleName).toBe('test-article');
  });

  test('should select article name ignoring query parameters', () => {
    const articleName = selectArticleName()({ route: { location: '/post/test-article?from=10' } });

    expect(articleName).toBe('test-article');
  });
});
