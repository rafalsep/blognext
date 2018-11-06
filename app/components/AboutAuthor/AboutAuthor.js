import React from 'react';
import styles from './AboutAuthor.scss';

const AboutAuthor = () => (
  <div className="AboutAuthor">
    <div className="header">About the author</div>

    <div className="content">
      <strong>Rafal Szczepankiewicz</strong>
      <p className="content-description">
        Web applications architect specialized in Java with more than 10 years of experience. Focused on designing and implementing software that is loved by developers and end users. Passionate about
        software best practices and paragliding.
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default AboutAuthor;
