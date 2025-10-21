import { Link } from "react-router-dom";
import { Star, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
}

const MovieCard = ({ id, title, year, rating, genre, poster }: MovieCardProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setIsInWatchlist(watchlist.some((movie: any) => movie.id === id));
  }, [id]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    
    if (isInWatchlist) {
      const updated = watchlist.filter((movie: any) => movie.id !== id);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setIsInWatchlist(false);
      toast({
        title: "Removed from Watchlist",
        description: `${title} has been removed from your watchlist.`,
      });
    } else {
      const updated = [...watchlist, { id, title, year, rating, genre, poster }];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setIsInWatchlist(true);
      toast({
        title: "Added to Watchlist",
        description: `${title} has been added to your watchlist.`,
      });
    }
  };

  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-card transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={poster}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
            </div>
            <h3 className="font-semibold text-white line-clamp-2">{title}</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">{genre}</Badge>
                <Badge variant="outline" className="text-xs text-white border-white/30">{year}</Badge>
              </div>
            </div>
            <Button
              onClick={toggleWatchlist}
              size="sm"
              variant={isInWatchlist ? "secondary" : "default"}
              className="w-full"
            >
              {isInWatchlist ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Watchlist
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
