import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

import {
  defaultDescription,
  defaultTitle,
} from "../common/helpers";

const TopBar = () => {
  const router = useRouter();

  const path = router.asPath.split("/");
  let cardType = path.length >= 3 ? path[2] : null;
  if (cardType) {
    cardType = cardType.split("?")[0];
  }

  return (
    <nav className="topbar">
      <div className="topbar-inner">
        {/* Header Content goes here*/}
      </div>
    </nav>
  );
};

type LayoutProps = {
  children?: React.ReactNode;
  description?: string;
  title?: string;
};

const Layout = ({ children, description, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta
          name="google-site-verification"
          content="dyv7-lOXQn9xEOYXMD6s0oQYUYuQzTGN-KkjuPlILxg"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FFL6ZJNJ4T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "G-FFL6ZJNJ4T");
        `}
      </Script>
      <TopBar />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
