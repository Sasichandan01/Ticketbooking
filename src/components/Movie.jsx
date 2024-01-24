import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Movie(props) {
  const [found, setNotFound] = useState(null);
  

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div data-os="fade-up">
      <figure className="image-block">
        <img src={`https://image.tmdb.org/t/p/w300/` + props.poster}  width="250" height="300" />
        <figcaption>
          <b>{props.title}</b>
          <p>Release Date : {props.release}</p>
          <Link
            state={{
              name: props.name,
              data: props.tmdata,
              title: props.title,
              year:props.year,
              mail: props.mail,
              city: props.city,
            }}
            to={`${props.tmdata.id}`}
          >
            <button>Book Now</button>
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}

export default Movie;
