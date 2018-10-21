import React from 'react';

import './Footer.scss';

export default function Footer() {
  return (
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
    </footer>
  );
}
