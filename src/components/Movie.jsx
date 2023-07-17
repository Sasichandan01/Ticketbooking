import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Movie(props) {

  const [found, setNotFound] = useState(null);
  const [tmdata, setmdata] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${props.title}&api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setmdata(data.results[0]))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div data-os="fade-down">
      <figure className="image-block">
        <img src={props.poster} />
        <figcaption>
          <b>{props.title}</b>
          <p>{props.genre}</p>
          <Link
            state={{
              name: props.name,
              data: tmdata,
              title: props.title,
              mail: props.mail,
            }}
            to={`${tmdata.id}`}
          >
            <button>Book Now</button>
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}

export default Movie;
