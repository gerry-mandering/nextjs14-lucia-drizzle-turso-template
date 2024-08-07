import { LuTerminal } from "react-icons/lu";

interface AlertErrorProps {
  message?: string;
}

export function AlertError({ message }: AlertErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <LuTerminal className="h-4 w-4" />
      <p className="-translate-y-px">{message}</p>
    </div>
  );
}
