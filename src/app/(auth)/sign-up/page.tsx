import { redirect } from "next/navigation";

import { getCurrentUser } from "@/auth/common/user";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default async function SignUpPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return <SignUpForm />;
}
