import "server-only";

import { cache } from "react";

import { validateRequest } from "@/lib/auth";
import { AccessDeniedError, AuthenticationError } from "@/lib/errors";
import { Role } from "@/db/schema";

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
    throw new AuthenticationError();
  }

  return user;
};

export const isAdmin = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }

  if (user.role !== Role.Enum.admin) {
    throw new AccessDeniedError();
  }

  return user;
};
