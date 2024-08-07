import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LuLoader2 } from "react-icons/lu";

export function LoaderButton({
  children,
  isPending,
  className,
  ...props
}: ButtonProps & {
  isPending: boolean;
}) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      {...props}
      className={cn("flex justify-center gap-2 px-3", className)}
    >
      {isPending && <LuLoader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
