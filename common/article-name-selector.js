import { createSelector } from 'reselect';

const selectArticleName = () =>
  createSelector(
    state => state.getIn(['route', 'location']).pathname || '/',
    pathname => {
      const articleName = pathname.split('/')[1] || '';
      return articleName.includes('?') ? articleName.split('?')[0] : articleName;
    }
  );

export { selectArticleName };
