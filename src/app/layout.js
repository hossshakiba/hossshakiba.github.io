import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export const metadata = {
  title: "Hossein Shakibania",
  description: "MS Student in AIML",
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
      try {
        var saved = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var shouldUseDark = saved ? saved === 'dark' : prefersDark;
        document.documentElement.classList.toggle('dark', shouldUseDark);
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className={lato.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
