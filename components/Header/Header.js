import React from 'react';
import Link from 'next/link';

import './Header.scss';

export default function Header() {
  return (
    <header className="Header">
      <div className="header__top">
        <div className="header__logo">
          <Link href="/">
            <a>&lt; GOOD dev &gt; - blog about programming best practices</a>
          </Link>
        </div>
        <div className="header__quote">
          <blockquote className="quote">Adapt what is useful, reject what is useless, and add what is specifically your own.</blockquote>
        </div>
      </div>
    </header>
  );
}
