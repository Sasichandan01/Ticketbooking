import React, { useEffect, useState } from "react";

import { useParams, Link, useLocation } from "react-router-dom";
import moment from "moment";
function Ticket() {
  const img_300 = "https://image.tmdb.org/t/p/w300";
  const noPicture =
    "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

  const location = useLocation();

  const name = location.state.name;
  const mvedata = location.state.data;
  const title = location.state.title;
  const mail = location.state.mail;
  const city = location.state.city;
  const year = location.state.year;

  var days = [
    {
      id: 0,
      name: "button-1",
      date: moment().add(1, "days").format("ddd, MMM D"),
    },
    {
      id: 1,
      name: "button-2",
      date: moment().add(2, "days").format("ddd, MMM D"),
    },
    {
      id: 2,
      name: "button-3",
      date: moment().add(3, "days").format("ddd, MMM D"),
    },
  ];

  var theatres = [
    { name: "PVR" },
    { name: "PVP" },
    { name: "INOX" },
    { name: "IMAX" },
  ];

  var costs = [{ cost: "200" }, { cost: "150" }, { cost: "100" }];

  const [movie, setmovieData] = useState([]);

  const [cost, setCost] = useState(null);
  const [found, setNotFound] = useState(null);
  const [credits, setCredits] = useState(null);

  const [activebutton, setactive] = useState(null);
  const [activeb, setactiveb] = useState(null);

  function handlecost(data) {
    setCost(data);
  }
  function dateclick(data) {
    setactive(data);
  }
  function theatreclick(data) {
    setactiveb(data);
  }

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=961ea94b`
    )
      .then((res) => res.json())
      .then((data) => setmovieData(data))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/credits?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setCredits(data.cast))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var credit = null;
  if (credits !== null) {
    credit = credits.slice(0, 6);
  }
  var num = 0;
  if (movie.imdbVotes !== undefined) {
    for (var i = 0; i < movie.imdbVotes.length; i++) {
      if (movie.imdbVotes[i] !== ",") {
        num += movie.imdbVotes[i];
      }
    }
  }

  var num3 = parseInt(mvedata.vote_average);
  var imdb = movie.imdbRating === "N/A" ? num3 : movie.imdbRating;

  var num1 = parseInt(num);
  num1 = num1 / 1000;
  num1 = Math.floor(num1);
  var t = parseInt(movie.Runtime);
  var h = Math.floor(t / 60);
  var min = Math.floor(t % 60);
  var plot =
    movie.Plot?.length > mvedata.overview?.length
      ? movie.Plot
      : mvedata.overview;

  var votes = num1 === 0 ? mvedata.vote_count : num1;
 
  return (
    <>
      <div className="movie">
        <div className="poster">
          <img
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500/` + mvedata.poster_path}
          />
        </div>

        <div className="matter">
          <h1 className="matter-title">{movie.Title} </h1>

          <div className="rating">
            <span className="imdb">
              <h2 className="abcd">
                <i
                  className="fa-sharp fa-solid fa-star"
                  style={{ color: "#f84464" }}
                ></i>
                {imdb}/10
              </h2>
            </span>
            <span>
              <strong>{votes}k</strong> votes
            </span>
          </div>

          <div className="elements">
            <ul>
              <li>
                {h}hr {min}min
              </li>
              <li>{movie.Genre}</li>
            </ul>
          </div>
          <div className="language">
            <li>{movie.Language}</li>
          </div>

          <div className="date">
            <label>
              <strong>Select Date </strong>
            </label>
            {days.map((data) => (
              <button
                type="button"
                name={data.date}
                id={activebutton === data.date ? "datebuttonid" : "datebutton"}
                onClick={() => dateclick(data.date)}
              >
                {data.date}
              </button>
            ))}
          </div>
          <div className="theatre">
            <label>
              <strong>SelectTheatre </strong>
            </label>
            {theatres.map((data) => (
              <button
                type="button"
                name={data.name}
                id={activeb === data.name ? "datebuttonid" : "datebutton"}
                onClick={() => theatreclick(data.name)}
              >
                {data.name}
              </button>
            ))}
          </div>
          {activebutton && activeb && (
            <div className="theatre">
              <label>
                <strong>SelectCost </strong>
              </label>
              {costs.map((data) => (
                <button
                  type="button"
                  name={data.cost}
                  id={cost === data.cost ? "datebuttonid" : "datebutton"}
                  onClick={() => handlecost(data.cost)}
                >
                  {data.cost}
                </button>
              ))}
            </div>
          )}
          {cost && activebutton && activeb && (
            <Link
              className="book-ticket"
              state={{
                data: activeb,
                cost: cost,
                date: activebutton,
                name: name,
                photo: mvedata.poster_path,
                title: title,
                mail: mail,
                city: city,
              }}
              to="booking"
            >
              <button type="button" className="ticket-button">
                Book tickets
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="plot">
        <h4>
          <strong>About the Movie</strong>
        </h4>
        <p>{plot}</p>
      </div>
      <div className="plot">
        <h4>
          <strong>Starring</strong>{" "}
        </h4>
        <div className="cast">
          {credit &&
            credit.map((c) => (
              <div>
                <div className="carouselItem">
                  <a
                    href={`https://en.wikipedia.org/wiki/${c?.name}`}
                    target="_blank"
                  >
                    <img
                      className="cast-img"
                      src={
                        c.profile_path
                          ? `${img_300}/${c.profile_path}`
                          : `https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg`
                      }
                      height="150"
                      width="150"
                    />
                  </a>
                </div>
                <div>
                  <p className="carouselItem__txt">{c?.name}</p>
                </div>
              </div>
            ))}
        </div>
        {!credit && <p>{movie.Actors}</p>}
      </div>
      <div className="plot">
        <h4>
          <strong>Directed by</strong>
        </h4>
        <b>{movie.Director}</b>
      </div>
    </>
  );
}

export default Ticket;
