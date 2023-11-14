//The Sign In/Out interface

import { ClerkProvider } from "@clerk/nextjs";
import { Raleway } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Chirpy",
  description:
    "Chirpy: Elevate your social experience with seamless connections, vibrant conversations, and personalized content sharing.",
};

const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${raleway.className} bg-dark-1`}>
          <span className="">{children}</span>
        </body>
      </html>
    </ClerkProvider>
  );
}
