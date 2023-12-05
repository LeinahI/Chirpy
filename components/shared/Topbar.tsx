import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/Logo_Chirpy.svg"
          alt="logo"
          width={28}
          height={28}
        />
        <p className="text-heading3-bold text-dark-1 max-xs:hideen">Chirpy</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="signout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            /* baseTheme: dark, */
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}
export default Topbar;
