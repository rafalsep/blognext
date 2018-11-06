import sanity from 'utils/sanityProvider';
import uuidv4 from 'uuid/v4';

export function appendComment(documentId, comment) {
  return sanity
    .patch(documentId)
    .insert('after', 'comments[-1]', [{ ...comment, _type: 'comment', _key: uuidv4() }])
    .commit();
}

export function addNewComment(documentId, comment) {
  return sanity
    .patch(documentId)
    .set({ comments: [{ ...comment, _type: 'comment', _key: uuidv4() }] })
    .commit();
}

export function addNewReply(documentId, commentKey, comment) {
  return sanity
    .patch(documentId)
    .set({ [`comments..[_key=="${commentKey}"].replies`]: [{ ...comment, _type: 'comment', _key: uuidv4() }] })
    .commit();
}

export function appendReply(documentId, commentKey, comment) {
  return sanity
    .patch(documentId)
    .insert('after', `comments..[_key=="${commentKey}"].replies[-1]`, [{ ...comment, _type: 'comment', _key: uuidv4() }])
    .commit();
}
