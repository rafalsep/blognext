import sanityClient from '@sanity/client';
import { SANITY_CONFIG } from 'common/env';

export default sanityClient(SANITY_CONFIG);
