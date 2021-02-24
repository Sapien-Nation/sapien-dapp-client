/* istanbul ignore file */
import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

// mui
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/static/favicon.ico" rel="icon" type="image/png" />
          <meta content={theme.palette.primary.main} name="theme-color" />
          <meta
            content="Sapien is a Web3 social network that rewards content creators and puts users back in control of their data. Built on Ethereum ♥️."
            name="description"
          />
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
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        materialUiSheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      materialUiSheets.getStyleElement(),
    ],
  };
};
