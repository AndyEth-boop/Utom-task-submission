import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { searchMovies } from "@/lib/mockData";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      setResults(searchMovies(queryParam));
    }
  }, [queryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      setResults(searchMovies(query));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container py-8 flex-1">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Search Movies
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies, actors, directors..."
                className="pl-12 pr-4 py-6 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {queryParam && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {results.length > 0 ? (
                <>
                  Found <span className="font-semibold text-foreground">{results.length}</span>{" "}
                  {results.length === 1 ? 'result' : 'results'} for "{queryParam}"
                </>
              ) : (
                <>No results found for "{queryParam}"</>
              )}
            </p>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((movie) => (
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
        ) : queryParam ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse our collection
            </p>
            <Button asChild>
              <Link to="/browse">Browse All Movies</Link>
            </Button>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
