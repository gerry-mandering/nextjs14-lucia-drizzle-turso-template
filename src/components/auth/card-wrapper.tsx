import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { FooterLink } from "@/components/auth/footer-link";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  showOAuthButtons?: boolean;
}

export function CardWrapper({
  children,
  title,
  description,
  footerLinkLabel,
  footerLinkHref,
  showOAuthButtons = true,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] max-w-[calc(100vw-2rem)] shadow-md">
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-6">
        {showOAuthButtons && (
          <>
            <OAuthButtons />
            {/* or */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
          </>
        )}
        {children}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center">
        <FooterLink href={footerLinkHref} label={footerLinkLabel} />
      </CardFooter>
    </Card>
  );
}
