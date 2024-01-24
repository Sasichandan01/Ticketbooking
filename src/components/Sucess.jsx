import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Sucess() {
  const location = useLocation();

  const cost = location.state.totalcost;
  const count = location.state.counts;
  const theater = location.state.theatre;
  const time = location.state.time;
  const date = location.state.date;
  const name = location.state.name;
  const title = location.state.title;
  const app = location.state.payoption;
  const photo = location.state.photo;
  const mail = location.state.mail;
  const city = location.state.city;
  const number = location.state.number;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <>
      <div className="success">
        <div>
          <figure>
            <img
              className="success-image"
              src={`https://image.tmdb.org/t/p/w500/` + photo}
            />
            <figcaption>Booking id: &nbsp;&nbsp; #a8i6h9 </figcaption>
          </figure>
        </div>

        <div className="success-content">
          <div className="success-details">
            <p>
              <span>{name}</span>
              <strong>,&nbsp;Your Tickets are successfully booked</strong>
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#f84464" }}
              ></i>
            </p>
          </div>
          <div className="success-details">
            <p>Payment through:</p>
            <p> {app}</p>
          </div>
          <div className="success-details">
            <p>Mobile Number:</p>
            <p>{number}</p>
          </div>
          <div className="success-details">
            <p>Booking id:</p>
            <p> #a8i6h9</p>
          </div>

          <div className="success-details">
            <p>Movie Name :</p>
            <p>{title}</p>
          </div>
          <div className="success-details">
            <p>No.of Tickets :</p>
            <p>{count}</p>
          </div>
          <div className="success-details">
            <p>Total Cost :</p>
            <p>{cost}/-</p>
          </div>
          <div className="success-details">
            <p>Theatre :</p>
            <p>{theater}</p>
          </div>
          <div className="success-details">
            <p>Date :</p>
            <p> {date}</p>
          </div>
          <div className="success-details">
            <p>Show Time :</p>
            <p>{time}</p>
          </div>
        </div>
      </div>

      <div className="success-feedback">
        <Link
          state={{ name: name, city: city, mail: mail }}
          to={`/${city}/movie`}
        >
          <button className="btn btn-primary  ">
            <i className="fa-solid fa-house"></i>
          </button>
        </Link>

        <Link
          state={{
            photo: photo,
            payoption: app,
            title: title,
            totalcost: cost,
            counts: count,
            theatre: theater,
            time: time,
            date: date,
            name: name,
            mail: mail,
          }}
          to="feedback"
        >
          <button className="btn btn-primary ">
            <i className="fa-solid fa-comment"></i>
          </button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
export default Sucess;
