/* istanbul ignore file */
import { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// import flush from 'styled-jsx/server';

// mui
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/static/favicon.ico" />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const materialUiSheets = new MaterialUiServerStyleSheets();
  // const originalRenderPage = ctx.renderPage;

  try {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
          {/* {styledComponentSheet.getStyleElement()} */}
          {/* {flush() || null} */}
        </Fragment>
      ]
    };
  } finally {
    // styledComponentSheet.seal();
  }
};
