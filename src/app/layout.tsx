"use client";
//simport type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {pathname === "/unauthorized" || pathname === "/login" ? null : (
            <div>
              {" "}
              <Navbar />
            </div>
          )}

          <div>{children}</div>
          {pathname === "/unauthorized" || pathname === "/login" ? null : (
            <div>
              <Footer />
            </div>
          )}
        </body>
      </html>
    </Provider>
  );
}
