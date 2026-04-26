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
    icon: "/wave.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={lato.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
