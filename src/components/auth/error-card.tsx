"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { AlertError } from "@/components/alert-error";

export function ErrorCard() {
  const error = useSearchParams().get("error");

  return (
    <CardWrapper
      title="Oops! Something went wrong!"
      description="An error occurred while trying to log in."
      footerLinkLabel="Go back to Sign In"
      footerLinkHref="/sign-in"
      showOAuthButtons={false}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <AlertError message={error || "Please try again later."} />
      </div>
    </CardWrapper>
  );
}
