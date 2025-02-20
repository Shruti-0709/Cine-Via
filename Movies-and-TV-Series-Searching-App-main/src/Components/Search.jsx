import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Tab, Tabs } from "@material-ui/core";
import ContentBox from "./ContentBox";
import PageControl from "./PageControl";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchSearchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=80deb4bd2977bc9673a7427effed30de&language=en-US&query=${searchText}&page=${page}`
    );
    const data = await response.json();
    setContent(data.results);
    console.log(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearchData();
  }, [page, type]);

  return (
    <Container className="pt-10">
      {/* Search Bar */}
      <div className="flex gap-x-3 justify-center mt-6">
        <TextField
          className="flex-1 bg-white text-black rounded-lg shadow-lg"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
          }}
        />
        <Button
          variant="contained"
          onClick={fetchSearchData}
          style={{
            backgroundColor: "#3bb33d",
            color: "white",
            boxShadow: "0px 0px 10px rgba(59, 179, 61, 0.8)",
          }}
          className="hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300"
        >
          <SearchIcon fontSize="large" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-5">
        <Tabs
          value={type}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          TabIndicatorProps={{ style: { backgroundColor: "#3bb33d" } }}
          className="text-black"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
          }}
        >
          <Tab label="Search Movies" className="text-black hover:text-gray-700" />
          <Tab label="Search TV Series" className="text-black hover:text-gray-700" />
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex flex-wrap justify-around gap-x-2 gap-y-7 pb-5 pt-5">
        {content &&
          content.map((d) => (
            <ContentBox
              key={d.id}
              id={d.id}
              poster={d.poster_path}
              media_type={type ? "tv" : "movie"}
              title={d.title || d.name}
              date={d.first_air_date || d.release_date}
            />
          ))}
      </div>

      {/* Pagination */}
      <PageControl setPage={setPage} numOfPages={numOfPages} />
    </Container>
  );
}

export default Search;
