import { spy } from 'sinon';
import { flattenDeep } from 'lodash';

beforeEach(() => {
  spy(console, 'error');
});

afterEach(() => {
  const consoleErrorParameters = console.error.args;
  console.error.restore();
  expect(flattenDeep(consoleErrorParameters)).toEqual([]);
});
