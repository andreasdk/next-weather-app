import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App built in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
