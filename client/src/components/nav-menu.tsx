import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function NavMenu() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-8">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">British Heritage</a>
          </Link>
          <div className="flex space-x-4">
            <Link href="/">
              <a
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  location === "/"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                View
              </a>
            </Link>
            <Link href="/edit">
              <a
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  location === "/edit"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                Edit
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}