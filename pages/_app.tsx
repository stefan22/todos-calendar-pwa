import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  return (
    <>
      <Head>
        <title>TODO Calendar</title>
        <meta name="description" content="Responsive TODO planner with calendar views." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#24554a" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
