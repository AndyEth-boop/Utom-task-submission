import { Link } from "react-router-dom";
import { Search, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/lib/mockData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBackdrop from "@/assets/hero-backdrop.jpg";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const trendingMovies = movies.slice(0, 6);
  
  const collections = [
    { title: "Hidden Gems", description: "Underseen masterpieces", movies: 24 },
    { title: "Classic Thrillers", description: "Suspense that stands the test of time", movies: 18 },
    { title: "Award Winners", description: "Oscar and festival favorites", movies: 32 },
    { title: "90s Nostalgia", description: "The decade that defined cinema", movies: 28 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        <div className="container relative z-10 text-center space-y-8 py-20">
          <h1 className="text-5xl md:text-7xl font-bold animate-fade-in" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Favorite Film
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Curated recommendations, personalized collections, and thousands of films to explore
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies, actors, directors..."
                className="pl-12 pr-4 py-6 text-lg bg-background/80 backdrop-blur border-2 focus:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="text-base">
              <Link to="/browse">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trending Now
            </h2>
            <p className="text-muted-foreground">Popular films everyone's watching</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/browse">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingMovies.map((movie) => (
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
      </section>

      {/* Curated Collections */}
      <section className="container py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Curated Collections
          </h2>
          <p className="text-muted-foreground">Handpicked themes for every mood</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={index}
              to="/browse"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {collection.title}
                </h3>
                <p className="text-muted-foreground mb-4">{collection.description}</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  <Star className="h-4 w-4 fill-primary" />
                  <span>{collection.movies} films</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
