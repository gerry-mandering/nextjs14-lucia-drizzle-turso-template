"use client";

import BoringAvatar from "boring-avatars";
import { Suspense } from "react";
import { User } from "lucia";
import stringWidth from "string-width";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuLogOut, LuSettings, LuUser } from "react-icons/lu";
import { signOut } from "@/auth/sign-out/actions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileDropdownProps {
  user: User;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const handleSignOut = async () => {
    await signOut();
  };

  console.log(stringWidth(user.displayName));

  return (
    <DropdownMenu>
      {/* Dropdown trigger */}
      <DropdownMenuTrigger>
        <Suspense
          fallback={
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800">
              ..
            </div>
          }
        >
          {user.image ? (
            <Avatar>
              <AvatarImage src={user.image} alt={user.displayName} />
              <AvatarFallback>{user.displayName[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <BoringAvatar
              name={user.displayName}
              colors={["#CC3000", "#FF8E00", "#C06F48", "#090705"]}
              variant="beam"
              size={32}
            />
          )}
        </Suspense>
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent
        className={cn("w-36", {
          "w-48": stringWidth(user.displayName) > 10,
          "w-56": stringWidth(user.displayName) > 13,
        })}
      >
        <div className="flex items-center space-x-2 px-2 py-2">
          <Suspense
            fallback={<div className="h-8 w-8 rounded-full bg-gray-800" />}
          >
            {user.image ? (
              <Avatar>
                <AvatarImage src={user.image} alt={user.displayName} />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <BoringAvatar
                name={user.displayName}
                colors={["#CC3000", "#FF8E00", "#C06F48", "#090705"]}
                variant="beam"
                size={42}
              />
            )}
          </Suspense>
          <DropdownMenuLabel className="flex-1 truncate text-center">
            {user.displayName}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />

        {/* Dropdown menu items */}
        <DropdownMenuItem className="cursor-pointer">
          <LuUser className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <LuSettings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LuLogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
