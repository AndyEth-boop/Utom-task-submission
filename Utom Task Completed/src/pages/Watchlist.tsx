import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(stored);

    // Listen for storage changes
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setWatchlist(updated);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Also check for changes on interval (for same-tab updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem("watchlist") || "[]");
      if (JSON.stringify(updated) !== JSON.stringify(watchlist)) {
        setWatchlist(updated);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [watchlist]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Watchlist
          </h1>
          <p className="text-muted-foreground">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved for later
          </p>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                poster={movie.poster}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Film className="h-24 w-24 text-muted-foreground mb-6 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding movies you want to watch later
            </p>
            <Button asChild size="lg">
              <Link to="/browse">Browse Movies</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Watchlist;
