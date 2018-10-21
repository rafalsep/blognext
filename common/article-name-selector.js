import { createSelector } from 'reselect';

const selectArticleName = () =>
  createSelector(
    state => state.route.location || '/',
    pathname => {
      const articleName = pathname.split('/')[1] || '';
      return articleName.includes('?') ? articleName.split('?')[0] : articleName;
    }
  );

export { selectArticleName };
