import { getCurrentUser } from "@/auth/common/user";
import { SignInForm } from "@/components/auth/sign-in-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return <SignInForm />;
}
