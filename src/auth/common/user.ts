import "server-only";

import { cache } from "react";

import { validateRequest } from "@/lib/auth";

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  if (!user) {
    return undefined;
  }

  return user;
});

export const getCurrentSession = async () => {
  const { session } = await validateRequest();

  return session;
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }

  return user;
};
