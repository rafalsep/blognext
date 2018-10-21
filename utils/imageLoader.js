import imageUrlBuilder from '@sanity/image-url';
import sanity from './sanityProvider';

const imageBuilder = imageUrlBuilder(sanity);

export function imageUrlFor(source) {
  return imageBuilder.image(source);
}
