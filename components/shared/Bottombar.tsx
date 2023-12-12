"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <div>
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${
                  isActive ? "bg-light-4" : "hover:bg-light-4"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className={`${isActive ? "text-primary-500" : "text-gray-1"} text-subtle-medium max-sm:hidden`}>
                  {link.label.split(/\s+/)[0]}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default Bottombar;
