"use client";
// app/layout.tsx
import "./globals.css";
import localFont from "next/font/local";
import AppWrapper from "@/components/AppWrapper"; // <- NEW wrapper
import { Provider } from "react-redux";
import { store } from "@/lib/store";
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

// export const metadata = {
//   title: "City Guide",
//   description: "enjoy with us",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-[100vw] overflow-x-hidden`}
      >
        <ClientProvider>
          <AppWrapper>{children}</AppWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
