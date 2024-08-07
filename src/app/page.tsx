import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <h1 className="text-center text-4xl font-bold">Main Page</h1>

      <h2 className="text-center text-2xl font-bold text-gray-500">
        Anybody can access this page
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Feature 1</CardTitle>
            <CardDescription>Description of feature 1</CardDescription>
          </CardHeader>
          <CardContent>
            <p>More details about feature 1...</p>
          </CardContent>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature 2</CardTitle>
            <CardDescription>Description of feature 2</CardDescription>
          </CardHeader>
          <CardContent>
            <p>More details about feature 2...</p>
          </CardContent>
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Link href="/sign-up">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
