import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { movies, genres, decades } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

const Browse = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDecades, setSelectedDecades] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("popularity");

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleDecade = (decade: string) => {
    setSelectedDecades(prev =>
      prev.includes(decade) ? prev.filter(d => d !== decade) : [...prev, decade]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedDecades([]);
    setMinRating(0);
  };

  const filteredMovies = movies.filter(movie => {
    if (selectedGenres.length > 0 && !selectedGenres.includes(movie.genre)) return false;
    if (movie.rating < minRating) return false;
    
    const decade = `${Math.floor(movie.year / 10) * 10}s`;
    if (selectedDecades.length > 0 && !selectedDecades.includes(decade)) return false;
    
    return true;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "year":
        return b.year - a.year;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const hasActiveFilters = selectedGenres.length > 0 || selectedDecades.length > 0 || minRating > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Browse Movies
          </h1>
          <p className="text-muted-foreground">Explore our collection of {movies.length} films</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="rounded-lg border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Genre Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Genre</h3>
                <div className="space-y-2">
                  {genres.filter(g => g !== "All").map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => toggleGenre(genre)}
                      />
                      <Label htmlFor={genre} className="text-sm cursor-pointer">
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decade Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Decade</h3>
                <div className="space-y-2">
                  {decades.map((decade) => (
                    <div key={decade} className="flex items-center space-x-2">
                      <Checkbox
                        id={decade}
                        checked={selectedDecades.includes(decade)}
                        onCheckedChange={() => toggleDecade(decade)}
                      />
                      <Label htmlFor={decade} className="text-sm cursor-pointer">
                        {decade}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Min Rating</h3>
                <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="7">7.0+</SelectItem>
                    <SelectItem value="8">8.0+</SelectItem>
                    <SelectItem value="8.5">8.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {selectedGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="gap-1">
                    {genre}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleGenre(genre)} />
                  </Badge>
                ))}
                {selectedDecades.map((decade) => (
                  <Badge key={decade} variant="secondary" className="gap-1">
                    {decade}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleDecade(decade)} />
                  </Badge>
                ))}
                {minRating > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    Rating {minRating}+
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(0)} />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {sortedMovies.length} {sortedMovies.length === 1 ? 'movie' : 'movies'}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="year">Release Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Movie Grid */}
            {sortedMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedMovies.map((movie) => (
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
              <div className="text-center py-12">
                <p className="text-muted-foreground">No movies found matching your filters.</p>
                <Button onClick={clearFilters} className="mt-4">Clear Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
