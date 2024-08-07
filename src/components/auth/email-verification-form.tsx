"use client";

import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { AlertSuccess } from "@/components/alert-success";
import { AlertError } from "@/components/alert-error";
import { verifyEmailAction } from "@/auth/email-verification/actions";
import { LuLoader2 } from "react-icons/lu";
import { cn } from "@/lib/utils";

export function EmailVerificationForm() {
  const [isPending, setIsPending] = useState(true);
  const token = useSearchParams().get("token");

  const { execute, data, error } = useServerAction(verifyEmailAction, {
    onSuccess({ data }) {
      setIsPending(false);
      console.log(data);
    },
    onError({ err }) {
      setIsPending(false);
      console.log(err);
    },
  });

  useEffect(() => {
    if (!token) return;

    execute({ token });
  }, [token, execute]);

  return (
    <CardWrapper
      title="Confirming your email"
      description="Please wait while we verify your email address."
      footerLinkLabel="Back to Sign In"
      footerLinkHref="/sign-in"
      showOAuthButtons={false}
    >
      <div className="flex min-h-16 w-full flex-col items-center justify-center">
        {isPending && (
          <LuLoader2 className={cn("h-16 w-16 animate-spin text-primary/60")} />
        )}
        {data && <AlertSuccess message={data.message} />}
        {error && <AlertError message={error.message} />}
      </div>
    </CardWrapper>
  );
}
