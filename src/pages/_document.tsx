import { Html, Head, Main, NextScript } from "next/document";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-2826613999405385";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {ADSENSE_CLIENT_ID && (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
