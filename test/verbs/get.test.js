import { get, getSuccess, getFailure } from '../../lib/verbs/get';
import { defaultItem } from '../../lib/defaults';
import {
  STATES, VERBS, STATE, VERB, DATA, CODE, ERROR, TIMESTAMP,
} from '../../lib/constants';

test('get', () => {
  expect(() => get()).toThrow('Expected state to be an object');
  expect(() => get(null)).toThrow('Expected state to be an object');
  expect(() => get('RANDOM')).toThrow('Expected state to have `items` object');
  expect(() => get([])).toThrow('Expected state to have `items` object');
  expect(() => get(2)).toThrow('Expected state to have `items` object');
  expect(() => get({})).toThrow('Expected state to have `items` object');
  expect(() => get({ items: undefined }))
    .toThrow('Expected state to have `items` object');
  expect(() => get({ items: 'RANDOM' }))
    .toThrow('Expected state to have `items` object');
  expect(() => get({ items: 2 }))
    .toThrow('Expected state to have `items` object');
  expect(() => get({ items: [] }))
    .toThrow('Expected state to have `items` object');
  expect(() => get({ items: null }))
    .toThrow('Expected state to have `items` object');
  expect(() => get({ items: {} }, {}))
    .toThrow('Expected id to be string or number');

  expect(
    get({ items: {} }, { id: 1 })
  ).toEqual({
    items: {
      1: {
        ...defaultItem,
        [STATE]: STATES.PENDING,
        [VERB]: VERBS.GET,
        [CODE]: null,
        [ERROR]: null,
        [TIMESTAMP]: 9999,
      }
    }
  });
});

test('getSuccess', () => {
  expect(() => getSuccess()).toThrow('Expected state to be an object');
  expect(() => getSuccess(null)).toThrow('Expected state to be an object');
  expect(() => getSuccess('RANDOM'))
    .toThrow('Expected state to have `items` object');
  expect(() => getSuccess([])).toThrow('Expected state to have `items` object');
  expect(() => getSuccess(2)).toThrow('Expected state to have `items` object');
  expect(() => getSuccess({})).toThrow('Expected state to have `items` object');
  expect(() => getSuccess({ items: undefined }))
    .toThrow('Expected state to have `items` object');
  expect(() => getSuccess({ items: 'RANDOM' }))
    .toThrow('Expected state to have `items` object');
  expect(() => getSuccess({ items: 2 }))
    .toThrow('Expected state to have `items` object');
  expect(() => getSuccess({ items: [] }))
    .toThrow('Expected state to have `items` object');
  expect(() => getSuccess({ items: null }))
    .toThrow('Expected state to have `items` object');
  expect(() => getSuccess({ items: {} }, {}))
    .toThrow('Expected id to be string or number');
  expect(() => getSuccess({ items: {} }, { id: 1 }))
    .toThrow('Expected item to be an object');

  expect(
    getSuccess({ items: {} }, { id: 1, item: {} })
  ).toEqual({
    items: {
      1: {
        ...defaultItem,
        [STATE]: STATES.SYNCED,
        [VERB]: VERBS.GET,
        [CODE]: 200,
        [ERROR]: null,
        [TIMESTAMP]: 9999,
      }
    }
  });
});

test('getFailure', () => {
  expect(() => getFailure()).toThrow('Expected state to be an object');
  expect(() => getFailure(null)).toThrow('Expected state to be an object');
  expect(() => getFailure('RANDOM'))
    .toThrow('Expected state to have `items` object');
  expect(() => getFailure([])).toThrow('Expected state to have `items` object');
  expect(() => getFailure(2)).toThrow('Expected state to have `items` object');
  expect(() => getFailure({})).toThrow('Expected state to have `items` object');
  expect(() => getFailure({ items: undefined }))
    .toThrow('Expected state to have `items` object');
  expect(() => getFailure({ items: 'RANDOM' }))
    .toThrow('Expected state to have `items` object');
  expect(() => getFailure({ items: 2 }))
    .toThrow('Expected state to have `items` object');
  expect(() => getFailure({ items: [] }))
    .toThrow('Expected state to have `items` object');
  expect(() => getFailure({ items: null }))
    .toThrow('Expected state to have `items` object');
  expect(() => getFailure({ items: {} }, {}))
    .toThrow('Expected id to be string or number');
  expect(() => getFailure({ items: {} }, { id: 1 }))
    .toThrow('Expected code to be a number');

  expect(
    getFailure({
      items: {
        1: {
          [DATA]: { value: 1 },
        }
      },
    }, { id: 1, code: 400 })
  ).toEqual({
    items: {
      1: {
        [DATA]: { value : 1 },
        [STATE]: STATES.FAILED,
        [VERB]: VERBS.GET,
        [CODE]: 400,
        [ERROR]: 'Error',
        [TIMESTAMP]: 9999,
      }
    }
  });

  expect(
    getFailure({ items: {} }, { id: 1, code: 404, error: 'Not found.' })
  ).toEqual({
    items: {
      1: {
        ...defaultItem,
        [STATE]: STATES.FAILED,
        [VERB]: VERBS.GET,
        [CODE]: 404,
        [ERROR]: 'Not found.',
        [TIMESTAMP]: 9999,
      }
    }
  });
});
