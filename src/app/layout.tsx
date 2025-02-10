"use client";
//simport type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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
export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) setTargetReached(true);
    else setTargetReached(false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true);

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const smallScreens = useMediaQuery(600);
  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {pathname === "/unauthorized" ||
          pathname === "/login" ||
          pathname === "/register" ? null : (
            <div>
              {" "}
              <Navbar />
            </div>
          )}

          <div
            style={
              pathname === "/register"
                ? {
                    backgroundImage: "url('/assets/Images/homepage2.png')",
                    backgroundSize: "cover",
                    height: smallScreens ? "1376px" : "100vh",
                  }
                : {}
            }
          >
            {children}
          </div>
          {pathname === "/unauthorized" ||
          pathname === "/login" ||
          pathname === "/register" ? null : (
            <div>
              <Footer />
            </div>
          )}
        </body>
      </html>
    </Provider>
  );
}
