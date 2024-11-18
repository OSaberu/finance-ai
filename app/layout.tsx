import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { dark } from "@clerk/themes";
import { Topbar } from "./_components/ui/topbar";

const MulishFont = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "finance.ai",
  description: "Site de finanças.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/login" appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={`${MulishFont.className} dark bg-[#0F0E11] antialiased`}
        >
          <Topbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
