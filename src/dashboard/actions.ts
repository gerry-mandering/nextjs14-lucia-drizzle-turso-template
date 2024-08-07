"use server";

import { z } from "zod";
import { isAdminProcedure, isAuthenticatedProcedure } from "@/auth/procedures";

export const userTestAction = isAuthenticatedProcedure
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx }) => {
    return {
      message: `Hello, ${ctx.user.displayName}! This is a test action for users.`,
      timestamp: new Date().toISOString(),
    };
  });

export const adminTestAction = isAdminProcedure
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx }) => {
    return {
      message: `Hello, Admin ${ctx.user.displayName}! This is a test action for admins.`,
      timestamp: new Date().toISOString(),
    };
  });
