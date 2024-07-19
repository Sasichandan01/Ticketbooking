import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function Feedback() {
  const location = useLocation();

  const name = location.state.name;
  //const mail = location.state.mail;
  const [ratings, setRating] = useState(0);
  const handlestar = (num) => {
    setRating(num);
  };
  const [text, setText] = useState("Submit");

  function handleClick() {
    setText("Thank you " + name);
  }

  const submit = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };
  const comment = ["Very Bad", "Bad", "Average", "Good", "Very Good"];
  return (
    <>
      <textarea
        className="textarea"
        rows="6"
        cols="40"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Write your feedback"
      />
      <div className="rating-star">
        {[...Array(5)].map((_, i) => (
          <button key={i} onClick={() => handlestar(i + 1)}>
            <i
              className="fa-solid fa-star fa-2x"
              style={{
                color: ` ${i < ratings ? "#FF9529" : "#DDE6ED"}`,
              }}
            ></i>
          </button>
        ))}
      </div>
      <div
        style={{ display: "flex", flexWrap: " wrap", justifyContent: "center",  }}
      >
        <b style={{fontFamily:"Anton sans-serigf"}}>{comment[ratings - 1]}</b>
      </div>
      <div>
        <form onSubmit={submit}>
          <button
            type="submit"
            className="ticket-button"
            id="feedback-button"
            onClick={handleClick}
          >
            {text}
          </button>
        </form>
      </div>
    </>
  );
}

export default Feedback;
