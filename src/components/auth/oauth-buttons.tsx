import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function OAuthButtons() {
  return (
    <div className="flex w-full flex-col gap-y-2 sm:flex-row sm:gap-x-4">
      {/* Google Login */}
      <Link
        href="/api/login/google"
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Google
      </Link>

      {/* Github Login */}
      <Link
        href="/api/login/github"
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        <FaGithub className="mr-2 h-4 w-4" />
        Github
      </Link>
    </div>
  );
}
