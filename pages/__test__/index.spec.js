/**
 * @jest-environment jsdom
 */
import { stub } from 'sinon';
import sanity from 'utils/sanityProvider';
import { renderPage } from 'utils/page-renderer';
import { createModelForPage } from 'utils/mock-store-creator';
import articlesRespone from './articles-response.json';
import IndexPage from '../index';

describe('Blog page integration test', () => {
  test('should render <Blog />', async () => {
    stub(sanity, 'fetch').returns(Promise.resolve(articlesRespone));
    const { store, props } = await createModelForPage(IndexPage);

    const indexPageComponent = renderPage(IndexPage, { store, props });

    expect(indexPageComponent.find('ArticleHeading')).toHaveLength(2);
  });
});
