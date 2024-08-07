"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { LuSun, LuMoon, LuMonitor } from "react-icons/lu";

interface ThemeItemProps {
  theme: string;
  label: string;
  Icon: React.ElementType;
}

export function ThemeSwitch() {
  const { setTheme } = useTheme();

  const ThemeItem = ({ theme, label, Icon }: ThemeItemProps) => (
    <DropdownMenuItem onClick={() => setTheme(theme)}>
      <div className="flex items-center gap-2">
        <Icon width={14} /> {label}
      </div>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeItem theme="light" label="Light" Icon={LuSun} />
        <ThemeItem theme="dark" label="Dark" Icon={LuMoon} />
        <ThemeItem theme="system" label="System" Icon={LuMonitor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
