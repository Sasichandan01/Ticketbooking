import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function Feedback() {
  const location = useLocation();

  const name = location.state.name;
  const mail = location.state.mail;

  const [text, setText] = useState("Submit");

  function handleClick() {
    setTimeout(1000);
    setText("Thank you " + name);
  }

  const submit = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };
  
  return (
    <>
      <textarea
        className="textarea"
        rows="10"
        cols="50"
        placeholder="Write your feedback"
      />
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
