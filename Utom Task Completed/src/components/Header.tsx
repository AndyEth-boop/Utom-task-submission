import { Link, useLocation } from "react-router-dom";
import { Film, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Film className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            CineMatch
          </span>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link 
            to="/browse" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/browse') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Browse
          </Link>
          <Link 
            to="/watchlist" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/watchlist') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Watchlist
          </Link>
          <Link to="/search">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
