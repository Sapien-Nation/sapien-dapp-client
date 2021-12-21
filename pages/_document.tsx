import Document, { Html, Head, Main, NextScript } from 'next/document';
import { tw } from 'twind';

class MyDocument extends Document {
  render() {
    return (
      <Html className={tw`h-full`}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#6200eaf" />
          <link href="/static/favicon.ico" rel="icon" type="image/png" />
        </Head>
        <body className={tw`h-full relative`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
