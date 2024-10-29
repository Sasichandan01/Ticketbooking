import React, { useEffect } from "react";
import cities from "../cities";
import { Link, useLocation } from "react-router-dom";
import { Toast } from "bootstrap";
export default function Ticket() {
  const location = useLocation();

  const name = location.state.name;
  const mail = location.state.mail;
  const newuser = location.state.newuser;

  const [city, setCity] = React.useState("");
  function click(event) {
    setCity(event.target.value);
  }
  useEffect(() => {
    const toastElement = document.getElementById("welcomeToast");
    const toast = new Toast(toastElement);
    toast.show();
  }, [newuser]);
  return (
    <>
      <div className="toast-container">
        {newuser === 0 && (
          <div
            id="welcomeToast"
            className="toast align-items-center text-bg-primary border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body toast-single-line">
                Welcome back {name}! Glad to see you again.
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        )}
        {newuser === 1 && (
          <div
            id="welcomeToast"
            className="toast align-items-center text-bg-primary border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body toast-single-line">
                Hello {name}! Welcome to Flix Booking.
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        )}
        {newuser === -1 && (
          <div
            id="welcomeToast"
            className="toast align-items-center text-bg-primary border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body toast-single-line">
                Welcome back {name}! Password Updated Successfully.
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="city">
        <div className="city-form">
          <h2>Select a city:</h2>
        </div>
        <div className="city-form" id="city-list">
          {cities.map((data) => (
            <label className="rad-label" value={data.name} onClick={click}>
              <input
                type="radio"
                className="rad-input"
                name="rad"
                value={data.name}
              />
              <div className="rad-design"></div>
              <div className="rad-text">{data.name}</div>
            </label>
          ))}
        </div>
        <div className="city-form">
          {city && (
            <Link
              state={{ name: name, mail: mail, city: city }}
              to={`/${city}/movie`}
            >
              <button type="button" className="ticket-button">
                Confirm city
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
