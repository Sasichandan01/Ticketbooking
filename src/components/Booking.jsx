import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Booking(props) {
  const location = useLocation();

  const mail = location.state.mail;
  const data = location.state.data;
  const date = location.state.date;
  const cost = location.state.cost;
  const name = location.state.name;
  const photo = location.state.photo;
  const title = location.state.title;
  const city = location.state.city;

  var c = parseInt(cost);

  const [count, setCount] = useState([0, false]);
  const [movie, setmovieData] = useState([]);
  const [found, setNotFound] = useState(null);
  const [totalcost, settotalcost] = useState(0);
  const [activeb, setactiveb] = useState(null);
  const time = new Date().getHours();

  var timings = [
    { value: "11", name: "11:00 A.M" },
    { value: "14", name: "2:00 P.M" },
    { value: "17", name: "5:00 P.M" },
    { value: "20", name: "8:00 P.M" },
    { value: "24", name: "10:00 P.M" },
  ];

 
  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?t=${title}&y=2023&apikey=961ea94b`
    )
      .then((res) => res.json())
      .then((data) => setmovieData(data))

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
  function handleselect(data) {
    setactiveb(data.name);
  }
  function handleClick(data) {
    if (data.target.className === "seat") {
      data.target.className = "seat selected";
      setCount([count[0] + 1, true]);
    } else {
      data.target.className = "seat";
      let a = count[0] - 1;
      let b = false;
      if (a > 0) {
        b = true;
      }
      setCount([a, b]);
    }
  }
  var d = parseInt(count[0]);
  var tc = c * d;

  return (
    <>
      <div className="booking">
        <div>
          <h4 className="userId1">{title}</h4>
          <p>{movie.Genre}</p>
        </div>
        <div className="title2">
          <h4>Theatre : {data}</h4>
          <p>Cost : {cost}</p>
        </div>
      </div>
      <div className="timings">
        {timings.map((data) => (
          <button
            type="button"
            name={data.name}
            value={data.value}
            id={activeb === data.name ? "timebuttonid" : "timebutton"}
            onClick={() => handleselect(data)}
          >
            {data.name}
          </button>
        ))}
      </div>
      {activeb && (
        <div className="Booking">
          <p className="text" data-aos="fade-out">
            Book tickets on <span>{date}</span>
          </p>
          <ul className="showcase" data-aos="fade-out">
            <li>
              <div id="seat" className="seat"></div>
              <small className="status">Available</small>
            </li>
            <li>
              <div id="seat" className="seat selected"></div>
              <small className="status">Selected</small>
            </li>
            <li>
              <div id="seat" className="seat occupied"></div>
              <small className="status">Occupied</small>
            </li>
          </ul>

          <div className="container" data-os="flip-up">
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="walk" data-aos="fade-out"></div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="row1" data-aos="fade-out">
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat occupied"></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
              <div id="seat" className="seat" onClick={handleClick}></div>
            </div>
            <div className="screen">
              <h3 className="content-screen">SCREEN THIS WAY</h3>
            </div>
          </div>

          {activeb && count[1] && (
            <Link
              state={{
                totalcost: tc,
                counts: count[0],
                theatre: data,
                time: activeb,
                date: date,
                name: name,
                title: title,
                photo: photo,
                mail: mail,
                city: city,
              }}
              to="payment"
            >
              <div className="confirm">
                <button type="button" className="ticket-button">
                  Confirm {count[0]} tickets
                </button>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Booking;
