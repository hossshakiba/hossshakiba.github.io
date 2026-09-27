import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoldenSnitch from "@/components/GoldenSnitch";
import FlyingOwl from "@/components/FlyingOwl";
import { SNITCH_ENABLED, OWL_ENABLED } from "@/config/magicCreatures";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

const SITE_URL = "https://hossshakiba.github.io";
const SITE_TITLE = "Hossein Shakibania";
const SITE_DESCRIPTION =
  "Hossein Shakibania is an MS student in AI & Machine Learning at TU Darmstadt and ELIZA Scholar, researching multimodal generative models: controllability, personalization, safety, and efficiency.";

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Hossein Shakibania — MS Student in AI & Machine Learning at TU Darmstadt",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_TITLE,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  jobTitle: "Student Research Assistant",
  description: SITE_DESCRIPTION,
  email: "mailto:shakibania.hossein@gmail.com",
  affiliation: {
    "@type": "Organization",
    name: "Multimodal AI Lab, TU Darmstadt",
    url: "https://www.informatik.tu-darmstadt.de/mai/multimodal_ai/index.en.jsp",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bu-Ali Sina University" },
  knowsAbout: [
    "Multimodal generative models",
    "Image generation",
    "Concept erasure",
    "AI safety",
    "Computer vision",
  ],
  sameAs: [
    "https://scholar.google.com/citations?user=huveR90AAAAJ",
    "https://github.com/hossshakiba",
    "https://www.linkedin.com/in/hossein-shakibania",
    "https://x.com/hossshakiba",
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Hossein Shakibania",
    "TU Darmstadt",
    "Multimodal AI Lab",
    "generative models",
    "image editing",
    "concept erasure",
    "AI safety",
    "computer vision",
    "machine learning",
  ],
  authors: [{ name: SITE_TITLE, url: SITE_URL }],
  creator: SITE_TITLE,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    firstName: "Hossein",
    lastName: "Shakibania",
    username: "hossshakiba",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@hossshakiba",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/wave.png", type: "image/png" },
    ],
    shortcut: ["/wave.png"],
  }
};

export default function RootLayout({ children }) {
  const themeBootScript = `
    (function () {
      document.documentElement.classList.add('js');
      try {
        var saved = localStorage.getItem('theme');
        var shouldUseDark = saved === 'dark';
        document.documentElement.classList.toggle('dark', shouldUseDark);
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="format-detection"
          content="telephone=no,date=no,address=no,email=no"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={lato.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        {SNITCH_ENABLED && <GoldenSnitch />}
        {OWL_ENABLED && <FlyingOwl />}
      </body>
    </html>
  );
}
