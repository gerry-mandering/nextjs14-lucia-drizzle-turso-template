import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { github } from "@/lib/auth";
import { setSession } from "@/auth/common/session";
import {
  createAccountViaGithub,
  getAccountByGithubId,
} from "@/auth/repository/account";
import { createUserViaGithub, getUserByEmail } from "@/auth/repository/user";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();

    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    // check if the user is already registered
    const existingAccount = await getAccountByGithubId(githubUser.id);
    if (existingAccount) {
      await setSession(existingAccount.userId);

      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    // check user email is already registered
    const isEmailRegistered = await getUserByEmail(githubUser.email);
    if (isEmailRegistered) {
      const errorMessage = encodeURIComponent(
        "Your email is already registered",
      );

      return new Response(null, {
        status: 302,
        headers: { Location: `/error?error=${errorMessage}` },
      });
    }

    // create new github user
    const newGithubUser = await createUserViaGithub(
      githubUser.name || githubUser.login,
      githubUser.avatar_url,
      githubUser.email,
    );
    await createAccountViaGithub(newGithubUser.id, githubUser.id);

    // set session
    await setSession(newGithubUser.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.error(e);
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

export interface GitHubUser {
  id: string;
  login: string;
  name: string | null;
  avatar_url: string;
  email: string;
}
