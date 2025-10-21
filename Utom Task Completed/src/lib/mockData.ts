export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  director: string;
  cast: string[];
  runtime: number;
  plot: string;
  poster: string;
  backdrop: string;
}

// Import poster images
import poster1 from "@/assets/movie-poster-1.jpg";
import poster2 from "@/assets/movie-poster-2.jpg";
import poster3 from "@/assets/movie-poster-3.jpg";
import heroBackdrop from "@/assets/hero-backdrop.jpg";

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Grand Premiere",
    year: 2023,
    rating: 8.7,
    genre: "Drama",
    director: "Sofia Martinez",
    cast: ["Emma Stone", "Oscar Isaac", "Viola Davis"],
    runtime: 142,
    plot: "A struggling theater director gets one last chance to stage the performance of a lifetime when a legendary actress agrees to star in her production. As opening night approaches, creative tensions and personal revelations threaten to derail the show.",
    poster: poster1,
    backdrop: heroBackdrop,
  },
  {
    id: 2,
    title: "Neon Runners",
    year: 2024,
    rating: 8.3,
    genre: "Sci-Fi",
    director: "Kenji Tanaka",
    cast: ["Ryan Gosling", "Ana de Armas", "Yahya Abdul-Mateen II"],
    runtime: 128,
    plot: "In a sprawling cyberpunk metropolis, a group of underground hackers discovers a conspiracy that could reshape reality itself. As they race against time through neon-lit streets, they must decide how far they're willing to go for the truth.",
    poster: poster2,
    backdrop: poster2,
  },
  {
    id: 3,
    title: "Shadows of Doubt",
    year: 2023,
    rating: 8.9,
    genre: "Thriller",
    director: "Christopher Hayes",
    cast: ["Cillian Murphy", "Florence Pugh", "Michael B. Jordan"],
    runtime: 135,
    plot: "A detective investigating a series of mysterious disappearances finds himself questioning his own sanity when the evidence points to an impossible conclusion. Every clue unravels more questions in this mind-bending psychological thriller.",
    poster: poster3,
    backdrop: poster3,
  },
  {
    id: 4,
    title: "Eternal Summer",
    year: 2022,
    rating: 7.8,
    genre: "Romance",
    director: "Luca Moretti",
    cast: ["Timothée Chalamet", "Zendaya", "Dev Patel"],
    runtime: 118,
    plot: "Two artists from different worlds meet during a transformative summer in the Italian countryside. As they collaborate on a ambitious art project, their creative partnership blossoms into something deeper.",
    poster: poster1,
    backdrop: heroBackdrop,
  },
  {
    id: 5,
    title: "The Last Stand",
    year: 2024,
    rating: 8.1,
    genre: "Action",
    director: "James Zhao",
    cast: ["Charlize Theron", "Idris Elba", "John Boyega"],
    runtime: 145,
    plot: "When a small town becomes the last line of defense against an approaching threat, a retired soldier must rally the community to protect everything they hold dear in this explosive action epic.",
    poster: poster2,
    backdrop: poster2,
  },
  {
    id: 6,
    title: "Laughing Matters",
    year: 2023,
    rating: 7.5,
    genre: "Comedy",
    director: "Mindy Park",
    cast: ["Awkwafina", "Kumail Nanjiani", "Issa Rae"],
    runtime: 105,
    plot: "A struggling comedian's life turns upside down when a viral video brings unexpected fame. Navigating the comedy circuit while staying true to her voice, she learns that the punchline isn't always where you expect it.",
    poster: poster3,
    backdrop: poster3,
  },
  {
    id: 7,
    title: "Midnight Protocol",
    year: 2023,
    rating: 8.4,
    genre: "Thriller",
    director: "David Fincher",
    cast: ["Jake Gyllenhaal", "Tilda Swinton", "Oscar Isaac"],
    runtime: 152,
    plot: "A cybersecurity expert uncovers a global conspiracy when a mysterious protocol begins executing at midnight across the world's networks. Racing against time, she must decode the pattern before the final midnight arrives.",
    poster: poster3,
    backdrop: heroBackdrop,
  },
  {
    id: 8,
    title: "Starbound",
    year: 2024,
    rating: 8.6,
    genre: "Sci-Fi",
    director: "Denis Villeneuve",
    cast: ["Saoirse Ronan", "Adam Driver", "Lupita Nyong'o"],
    runtime: 168,
    plot: "Humanity's first interstellar voyage faces an existential crisis when the crew discovers they're not alone in the universe. As contact with Earth fades, they must decide the fate of two civilizations.",
    poster: poster2,
    backdrop: poster2,
  },
];

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => movie.genre === genre);
};

export const searchMovies = (query: string): Movie[] => {
  const lowerQuery = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowerQuery) ||
    movie.director.toLowerCase().includes(lowerQuery) ||
    movie.cast.some(actor => actor.toLowerCase().includes(lowerQuery))
  );
};

export const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Romance"];
export const decades = ["2020s", "2010s", "2000s", "1990s", "1980s"];
