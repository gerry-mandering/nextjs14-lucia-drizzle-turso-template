import { LuCheck } from "react-icons/lu";

interface AlertSuccessProps {
  message?: string;
}

export function AlertSuccess({ message }: AlertSuccessProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-green-500/15 p-3 text-sm text-green-500">
      <LuCheck className="h-5 w-5" />
      <p className="-translate-y-px">{message}</p>
    </div>
  );
}
