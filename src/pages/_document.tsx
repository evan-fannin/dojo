import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <link rel="manifest" href="/manifest.json"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      
      <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta name="mobile-web-app-capable" content="yes"></meta>
      <meta name="apple-mobile-web-app-title" content="Dojo"></meta>
      <meta name="apple-touch-fullscreen" content="yes"></meta>
      </Head>
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
