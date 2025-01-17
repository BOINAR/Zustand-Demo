import type {Metadata} from "next";
import "./globals.css";
import Header from "../components/layout/header";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <html lang="en" >
      <body className="min-h-screen bg-gray-100">
        <Header /> {/* Affiche le header global */}
        <main>{children}</main> {/* C'est ici que le contenu des pages s'affiche */}
      </body>
      </html>
    </>
  );
}
