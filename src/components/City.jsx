import React from "react";
import cities from "../cities";
import { Link, useLocation } from "react-router-dom";
import { CToast, CToastHeader, CToastBody } from "@coreui/react";
export default function Ticket() {
  const location = useLocation();

  const name = location.state.name;
  const mail = location.state.mail;

  const [city, setCity] = React.useState("");
  
  function click(event) {
    setCity(event.target.value);
  }

  return (
    <>
      <CToast
        animation={true}
        autohide={true}
        visible={true}
        placement="bottom-end"
      >
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <div className="fw-bold me-auto">Hello, {name}</div>
          <small></small>
        </CToastHeader>
        <CToastBody>Welcome to Flix Booking</CToastBody>
      </CToast>
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
