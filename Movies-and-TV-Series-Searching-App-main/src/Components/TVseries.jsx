import ContentBox from "./ContentBox";
import PageControl from "./PageControl";
import Genresprop from './Genresprop'
import useGenre from "../Services/useGenre";
import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
function TVseries() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  const genreforURL = useGenre(selectedGenres);

  const fetchTVData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=80deb4bd2977bc9673a7427effed30de&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    const data = await response.json();
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTVData();
  }, [genreforURL, page]);

  
  return (
    <Container >
    <div className="text-center">
      <h3 className="[text-shadow:_1px_2px_0_rgb(163_163_163/_100%)] text-3xl pb-6 text-black">Discover Movies</h3>
      <Genresprop
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="flex flex-wrap justify-around gap-x-2 gap-y-7 pb-5 pt-5">
        {content &&
          content.map((d) => (
            <ContentBox
              key={d.id}
              id={d.id}
              poster={d.poster_path}
              media_type="tv"
              title={d.title || d.name}
              date={d.first_air_date || d.release_date}
            />
          ))}
      </div>
      <PageControl setPage={setPage} numOfPages={numOfPages}/>
    </div>
    </Container>
  );
}

export default TVseries