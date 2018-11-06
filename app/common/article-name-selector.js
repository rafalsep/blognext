import { createSelector } from 'reselect';

const selectArticleName = () =>
  createSelector(
    state => state.route.location || '/post/',
    pathname => {
      const articleName = pathname.split('/')[2] || '';
      return articleName.includes('?') ? articleName.split('?')[0] : articleName;
    }
  );

export { selectArticleName };
