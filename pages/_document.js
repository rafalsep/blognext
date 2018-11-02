import React from 'react';
import Document, { Main, NextScript, Head as NextHead } from 'next/document';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <NextHead />
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
