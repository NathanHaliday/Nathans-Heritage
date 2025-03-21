import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function NavMenu() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/heritage", label: "Heritage" },
    { href: "/hobbies", label: "Hobbies" },
  ];

  return (
    <nav className="border-b bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold">British Heritage</a>
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    location === item.href
                      ? "bg-primary-foreground text-primary"
                      : "text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
