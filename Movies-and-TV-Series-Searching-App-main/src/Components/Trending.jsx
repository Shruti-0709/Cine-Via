import { useEffect, useState } from "react";
import ContentBox from "./ContentBox";
import PageControl from "./PageControl";
import { Container } from "@material-ui/core";
const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  
  const fetchTrendingData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=80deb4bd2977bc9673a7427effed30de&page=${page}`
    );
    const data = await response.json();
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrendingData();
  }, [page]);

  return (
    <Container >
    <div className="text-center">
      <h3 className="[text-shadow:_1px_2px_0_rgb(163_163_163/_100%)] text-3xl pb-6 text-black">Trending Today</h3>
      <div className="flex flex-wrap justify-around gap-x-2 gap-y-7 pb-5">
        {content &&
          content.map((d) => (
            <ContentBox
              key={d.id}
              id={d.id}
              poster={d.poster_path}
              media_type={d.media_type}
              title={d.title || d.name}
              date={d.first_air_date || d.release_date}
            />
          ))}
      </div>
      <PageControl setPage={setPage} />
    </div>
    </Container>
  );
};

export default Trending;