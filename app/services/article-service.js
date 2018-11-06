import sanity from 'utils/sanityProvider';

const fetchArticlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  image,
  title,
  slug,
  publishedAt,
  teaser,
  comments,
  _id
}[0...50]
`;

const fetchArticleQuery = slug => `*[_type == "article" && slug.current=="${slug}"] {
  title,
  slug,
  content,
  comments,
  title,
  teaser,
  image,
  _id
}
`;

export function fetchArticles() {
  return sanity.fetch(fetchArticlesQuery);
}

const fetchTrendingArticlesQuery = `*[_type == "article"] | order(count(comments) desc) {
  image,
  title,
  slug,
  comments
}[0...8]
`;

export function fetchTrendingArticles() {
  return sanity.fetch(fetchTrendingArticlesQuery);
}

const countReplies = replies => replies.filter(reply => reply.replies).reduce((memo, reply) => memo + reply.replies.length + countReplies(reply.replies), 0);

export function fetchArticle(articleSlug) {
  return sanity.fetch(fetchArticleQuery(articleSlug)).then(response => {
    const [article] = response;
    const commentsCount = article.comments.length + countReplies(article.comments);
    return { ...article, commentsCount };
  });
}
