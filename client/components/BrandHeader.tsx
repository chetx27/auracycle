import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function BrandHeader() {
  const loc = useLocation();
  const isActive = (path: string) => loc.pathname === path;
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-gradient-to-br from-rose-400 via-fuchsia-400 to-violet-400 grid place-items-center text-white shadow-sm">
            <Sparkles className="size-4" />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500">
            Aura Cycle
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            to="/"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive("/") && "bg-accent text-accent-foreground",
            )}
          >
            Home
          </Link>
          <Link
            to="/insights"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive("/insights") && "bg-accent text-accent-foreground",
            )}
          >
            Insights
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <a href="#chatbot">Chat</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
