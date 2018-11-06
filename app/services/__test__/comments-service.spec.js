import { stub, assert } from 'sinon';
import sanityProvider from 'utils/sanityProvider';
import { addNewComment, addNewReply, appendComment, appendReply } from '../comments-service';

jest.mock('uuid/v4', () => () => '1');

describe('comments-service', () => {
  test('should add new comment', () => {
    const setStub = stub().returns({ commit: () => 'new comment' });
    stub(sanityProvider, 'patch').returns({ set: setStub });

    const comment = addNewComment('docId1', { content: 'test comment' });

    assert.calledWithExactly(sanityProvider.patch, 'docId1');
    assert.calledWithExactly(setStub, { comments: [{ content: 'test comment', _type: 'comment', _key: '1' }] });
    expect(comment).toBe('new comment');
  });

  test('should add new reply', () => {
    const setStub = stub().returns({ commit: () => 'new reply' });
    stub(sanityProvider, 'patch').returns({ set: setStub });

    const comment = addNewReply('docId1', 'key1', { content: 'test reply' });

    assert.calledWithExactly(sanityProvider.patch, 'docId1');
    assert.calledWithExactly(setStub, { 'comments..[_key=="key1"].replies': [{ content: 'test reply', _type: 'comment', _key: '1' }] });
    expect(comment).toBe('new reply');
  });

  test('should append new comment', () => {
    const insertStub = stub().returns({ commit: () => 'new appended comment' });
    stub(sanityProvider, 'patch').returns({ insert: insertStub });

    const comment = appendComment('docId1', { content: 'new appended comment' });

    assert.calledWithExactly(sanityProvider.patch, 'docId1');
    assert.calledWithExactly(insertStub, 'after', 'comments[-1]', [{ content: 'new appended comment', _type: 'comment', _key: '1' }]);
    expect(comment).toBe('new appended comment');
  });

  test('should append new reply', () => {
    const insertStub = stub().returns({ commit: () => 'new appended reply' });
    stub(sanityProvider, 'patch').returns({ insert: insertStub });

    const comment = appendReply('docId1', 'key1', { content: 'new appended reply' });

    assert.calledWithExactly(sanityProvider.patch, 'docId1');
    assert.calledWithExactly(insertStub, 'after', 'comments..[_key=="key1"].replies[-1]', [{ content: 'new appended reply', _type: 'comment', _key: '1' }]);
    expect(comment).toBe('new appended reply');
  });

  afterEach(() => {
    sanityProvider.patch.restore();
  });
});
