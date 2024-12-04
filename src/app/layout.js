import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Hossein Shakibania",
  description: "MS Student in Computer Science",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
