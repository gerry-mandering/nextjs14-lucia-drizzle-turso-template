import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface FooterLinkProps {
  href: string;
  label: string;
}

export function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "link", size: "sm" }))}
    >
      {label}
    </Link>
  );
}
