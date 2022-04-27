import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#6200eaf" />
          <link href="/static/favicon.ico" rel="icon" type="image/png" />
        </Head>
        <body className="h-full relative overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
