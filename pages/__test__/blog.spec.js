/**
 * @jest-environment jsdom
 */
import { stub } from 'sinon';
import sanity from 'utils/sanityProvider';
import { renderPage } from 'utils/page-renderer';
import { createModelForPage } from 'utils/mock-store-creator';
import articlesRespone from './articles-response.json';
import Blog from '../blog';

describe('Blog page integration test', () => {
  test('should render <Blog />', async () => {
    stub(sanity, 'fetch').returns(Promise.resolve(articlesRespone));
    const { store, props } = await createModelForPage(Blog);

    const blogPageComponent = renderPage(Blog, { store, props });

    expect(blogPageComponent.find('ArticleHeading')).toHaveLength(2);
  });
});
