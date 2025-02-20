import { Chip } from "@material-ui/core";
import { useEffect } from "react";

const Genresprop = ({
type,
selectedGenres,
setSelectedGenres,
genres,
setGenres,
setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenreData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=80deb4bd2977bc9673a7427effed30de&language=en-US`
    );
    const data = await response.json();
    
    setGenres(data.genres)
};
  
  useEffect(() => {
    fetchGenreData();
  }, []);
  return (
    <div className=" py-2 flex flex-wrap justify-center gap-x-2 gap-y-2">
      {selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((e) => (
        <Chip
          label={e.name}
          key={e.id}
          clickable
          onClick={() => handleAdd(e)}
        />
      ))}
    </div>
  );
};

export default Genresprop;