import Link from "next/link";

import { LuLogIn } from "react-icons/lu";

import { ThemeSwitch } from "@/components/layout/header/theme-switch";
import { getCurrentUser } from "@/auth/common/user";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/layout/header/profile-dropdown";

export async function Header() {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-[3.125rem]">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">
          LOGO
        </Link>

        <div className="flex items-center space-x-4">
          {/* Theme Switch */}
          <ThemeSwitch />

          {isAuthenticated ? (
            <ProfileDropdown user={user} />
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/sign-in">
                <LuLogIn className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
