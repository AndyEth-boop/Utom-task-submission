import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovieById, movies } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, Plus, Check, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const movie = getMovieById(Number(id));
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (movie) {
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setIsInWatchlist(watchlist.some((m: any) => m.id === movie.id));
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
            <Button asChild>
              <Link to="/browse">Browse Movies</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    
    if (isInWatchlist) {
      const updated = watchlist.filter((m: any) => m.id !== movie.id);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setIsInWatchlist(false);
      toast({
        title: "Removed from Watchlist",
        description: `${movie.title} has been removed from your watchlist.`,
      });
    } else {
      const updated = [...watchlist, { ...movie }];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setIsInWatchlist(true);
      toast({
        title: "Added to Watchlist",
        description: `${movie.title} has been added to your watchlist.`,
      });
    }
  };

  const relatedMovies = movies.filter(m => m.id !== movie.id && m.genre === movie.genre).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Backdrop */}
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container relative h-full flex items-end pb-8">
          <Button asChild variant="ghost" size="sm" className="absolute top-8 left-8">
            <Link to="/browse">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Link>
          </Button>
        </div>
      </div>

      <div className="container -mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-80 flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-xl font-bold">{movie.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{movie.runtime} min</span>
                </div>
                
                <Badge variant="secondary">{movie.genre}</Badge>
              </div>

              <div className="flex gap-3">
                <Button onClick={toggleWatchlist} size="lg">
                  {isInWatchlist ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      Add to Watchlist
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg">
                  Share
                </Button>
              </div>
            </div>

            {/* Plot Synopsis */}
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Plot Synopsis
              </h2>
              <p className="text-muted-foreground leading-relaxed">{movie.plot}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Cast</h3>
                <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              More Like This
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedMovies.map((relatedMovie) => (
                <MovieCard
                  key={relatedMovie.id}
                  id={relatedMovie.id}
                  title={relatedMovie.title}
                  year={relatedMovie.year}
                  rating={relatedMovie.rating}
                  genre={relatedMovie.genre}
                  poster={relatedMovie.poster}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
