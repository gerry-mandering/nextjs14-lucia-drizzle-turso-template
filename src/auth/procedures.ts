import { createServerActionProcedure } from "zsa";

import { env } from "@/env";
import { PublicError } from "@/lib/errors";
import { isAdmin, isAuthenticated } from "@/auth/common/user";

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  const isDev = env.NODE_ENV === "development";

  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${isDev ? "DEV ONLY ENABLED - " : ""}${err.message}`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const isAuthenticatedProcedure = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await isAuthenticated();
    return { user };
  });

export const isAdminProcedure = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await isAdmin();
    return { user };
  });
