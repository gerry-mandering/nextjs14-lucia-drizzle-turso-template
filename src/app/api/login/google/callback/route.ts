import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { google } from "@/lib/auth";
import { setSession } from "@/auth/common/session";
import {
  createAccountViaGoogle,
  getAccountByGoogleId,
} from "@/auth/repository/account";
import { createUserViaGoogle, getUserByEmail } from "@/auth/repository/user";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const googleUser: GoogleUser = await googleUserResponse.json();

    // check if the user is already registered
    const existingAccount = await getAccountByGoogleId(googleUser.sub);
    if (existingAccount) {
      await setSession(existingAccount.userId);

      return new Response(null, {
        status: 302,
        headers: { Location: "/dashboard" },
      });
    }

    // check user email is already registered
    const isEmailRegistered = await getUserByEmail(googleUser.email);
    if (isEmailRegistered) {
      const errorMessage = encodeURIComponent(
        "Your email is already registered",
      );

      return new Response(null, {
        status: 302,
        headers: { Location: `/error?error=${errorMessage}` },
      });
    }

    // create new google user
    const user = await createUserViaGoogle(
      googleUser.name,
      googleUser.picture,
      googleUser.email,
    );
    await createAccountViaGoogle(user.id, googleUser.sub);

    // set session
    await setSession(user.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  } catch (e) {
    console.error(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
