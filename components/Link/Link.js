import React, { memo } from 'react';
import { string, node, bool } from 'prop-types';
import NextLink from 'next/link';
import styles from './Link.scss';

const Link = ({ href, children, className, prefetch }) => (
  <div className="Link">
    <NextLink href={href} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </NextLink>
    <style jsx>{styles}</style>
  </div>
);

Link.propTypes = {
  href: string,
  children: node.isRequired,
  className: string,
  prefetch: bool
};

Link.defaultProps = {
  href: '',
  className: '',
  prefetch: false
};

export default memo(Link);
