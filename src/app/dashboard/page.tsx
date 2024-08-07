"use client";

import { useState } from "react";
import { useServerAction } from "zsa-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userTestAction, adminTestAction } from "@/dashboard/actions";

export default function DashboardPage() {
  const [userActionResult, setUserActionResult] = useState("");
  const [adminActionResult, setAdminActionResult] = useState("");

  const { execute: executeUserAction, isPending: isUserActionPending } =
    useServerAction(userTestAction);
  const { execute: executeAdminAction, isPending: isAdminActionPending } =
    useServerAction(adminTestAction);

  const handleUserAction = async () => {
    const [data, error] = await executeUserAction({});
    if (error) {
      setUserActionResult(`Error: ${error.message}`);
    } else {
      setUserActionResult(`${data.message} (${data.timestamp})`);
    }
  };

  const handleAdminAction = async () => {
    const [data, error] = await executeAdminAction({});
    if (error) {
      setAdminActionResult(`Error: ${error.message}`);
    } else {
      setAdminActionResult(`${data.message} (${data.timestamp})`);
    }
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <h1 className="text-center text-4xl font-bold">Dashboard Page</h1>

      <h2 className="text-center text-2xl font-bold text-gray-500">
        Only logged in users can access this page
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Test Action</CardTitle>
            <CardDescription>Any user can request this action</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleUserAction} disabled={isUserActionPending}>
              {isUserActionPending ? "Loading..." : "Execute User Action"}
            </Button>
            {userActionResult && (
              <p className="mt-4 text-sm">{userActionResult}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Test Action</CardTitle>
            <CardDescription>
              Only admins can request this action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleAdminAction} disabled={isAdminActionPending}>
              {isAdminActionPending ? "Loading..." : "Execute Admin Action"}
            </Button>
            {adminActionResult && (
              <p className="mt-4 text-sm">{adminActionResult}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
