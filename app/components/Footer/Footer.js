import React, { memo } from 'react';
import styles from './Footer.scss';

const Footer = () => (
  <footer className="Footer">
    <section>
      <div className="footer__note">
        <span>© Rafal Szczepankiewicz 2018. All code examples are licensed under </span>
        <span>
          <a href="http://opensource.org/licenses/MIT" rel="nofollow">
            MIT
          </a>
        </span>
      </div>
    </section>
    <style jsx>{styles}</style>
  </footer>
);

export default memo(Footer);
