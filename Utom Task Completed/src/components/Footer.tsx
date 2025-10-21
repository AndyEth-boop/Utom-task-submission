import { Link } from "react-router-dom";
import { Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-slate text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                CineMatch
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover your next favorite film through curated collections and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">Browse Movies</Link></li>
              <li><Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">Search</Link></li>
              <li><Link to="/watchlist" className="text-muted-foreground hover:text-primary transition-colors">My Watchlist</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 CineMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
