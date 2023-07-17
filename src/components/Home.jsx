import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import movies from "../movies";
import Movie from "./Movie";

function Home() {
  const location = useLocation();
  const name = location.state.name;
  const mail = location.state.mail;
  const [count, setCount] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var sortedmovies = [...movies].sort((p1, p2) =>
    p1.title > p2.title ? 1 : p1.title < p2.title ? -1 : 0
  );

  function handleClick() {
    console.log(movies);
    console.log(sortedmovies);
    setCount(!count);
  }
  
  return (
    <>
      <div className="latestmovies">
        <div>
          <h3>Latest Movies</h3>
        </div>
        <div>
          <a
            data-tooltip-id="my-tooltip2"
            data-tooltip-content={count === false ? "Sort By Title" : "Unsort"}
            data-tooltip-place="top"
          >
            <button onClick={handleClick}>
              <i class="fa-solid fa-sort"></i>
            </button>
          </a>
          <Tooltip id="my-tooltip2" />
        </div>
      </div>
      {!count && (
        <div className="moviesss-container">
          {movies.map((data) => (
            <Movie
              name={name}
              mail={mail}
              id={data.id}
              year={data.year}
              title={data.title}
              poster={data.poster}
              genre={data.genre}
            />
          ))}
        </div>
      )}
      {sortedmovies && count && (
        <div className="moviesss-container">
          {sortedmovies.map((data) => (
            <Movie
              name={name}
              mail={mail}
              id={data.id}
              year={data.year}
              title={data.title}
              poster={data.poster}
              genre={data.genre}
            />
          ))}
        </div>
      )}
    </>
  );
}
export default Home;
