import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { RootProvider } from "@/contexts/RootContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Share Code Snippets",
  description: "Share any Kinds of code snippets with anyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
