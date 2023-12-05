/* import type { Metadata } from "next"; */
import { Inter } from "next/font/google";
import "../globals.css";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
/* import RightSidebar from "@/components/shared/RightSidebar"; */
import Bottombar from "@/components/shared/Bottombar";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const mainFont = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chirpy",
  description:
    "Chirpy: Elevate your social experience with seamless connections, vibrant conversations, and personalized content sharing.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Always Redirect to /sign-in if not logged in */
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={mainFont.className}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            {/* <RightSidebar /> */}
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
