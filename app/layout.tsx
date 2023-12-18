import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wordplai",
  description: "AI Powered Creative Writing Coach",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`font-normal p-8 ${notoSerif.className} min-h-screen flex flex-col`}
        >
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
