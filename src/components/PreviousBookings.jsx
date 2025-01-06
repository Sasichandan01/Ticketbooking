/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import react, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import moment from "moment";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function PreviousBookings() {
  const location = useLocation();
  const name = location.state.name;
  const mail = location.state.mail;
  const localhost = process.env.REACT_APP_LOCALHOST2;
  const backend = process.env.REACT_APP_BACKEND2;
  const today = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const [review, setreview] = useState("");
  const [Story, setstory] = useState("");
  const [Direction, setdirection] = useState("");
  const [Music, setMusic] = useState("");
  const [users, setUsers] = useState([]);
  const [centredModal, setCentredModal] = useState({ id: "", open: false });
  const [centredModal1, setCentredModal1] = useState({ id: "", open: false });
  const [text, settext] = useState("If yes, Payment is processed in 24 hours");

  useEffect(() => {
    axios
      .get(`${backend}`, {
        params: {
          name: name,
          mail: mail,
        },
      })
      .then((response) => {
        const data = response.data.response;
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      })
      .catch((err) => console.log(err));
  }, [users]);

  const handleUpdate = async (movieId, review) => {
    try {
      const response = await fetch(
        `${backend}/${movieId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId, Story,Direction,Music }), // Ensure review is an object
        }
      );

      if (response.ok) {
        setreview("Review Submitted Successfully 🎉🎉");
        setTimeout(() => {
          setreview(" ");
          setstory("");
          setdirection("");
          setMusic("");
          setCentredModal((prevState) => ({
            ...prevState,
            open: 0,
            id: "",
          }));
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating movie:", err);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`${backend}/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setUsers((prevItems) => prevItems.filter((_, i) => i !== movieId));
        settext(
          "Ticket is Successfully Cancelled 🎉🎉, Payment will be processed in 24 hours"
        );
        setTimeout(() => {
          setCentredModal1((prevState) => ({
            ...prevState,
            open: 0,
            id: "",
          }));
          settext("If yes, Payment is processed in 24 hours");
        }, 2000);
      } else {
        console.log("Failed to cancel movie ticket,Retry in a while");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const toggleShow = (event) => {
    const ids = event.target.id;
    setCentredModal((prevState) => ({
      open: !prevState.open,
      id: ids,
    }));
  };

  const toggleShow1 = (event) => {
    const ids = event.target.id;

    setCentredModal1((prevState) => ({
      open: !prevState.open,
      id: ids,
    }));
  };
  function compareDates1(today, dataDate) {
    if (today < dataDate) {
      return 0;
    } else {
      return 1;
    }
  }

  return (
    <>
      <Nav />
      <div className="prevbook">
        {users.length !== 0 && <h3>Previous Bookings</h3>}
        {users.length === 0 && <h3>No Previous Bookings</h3>}
      </div>
      <div>
        <div className="prevtable">
          {users &&
            users.map((data) => (
              <div key={data._id} className="prevbookdata">
                <div className="prevbookdatain">
                  <div>
                    <img
                      className="prevbookdataimg"
                      src={`https://image.tmdb.org/t/p/w300/` + data.photo}
                      alt=""
                    ></img>
                  </div>
                  <div>
                    <td>
                      <table className="prevbookdetails">
                        <div>
                          <h3
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bolder",
                            }}
                          >
                            <strong>{data.title}</strong>
                          </h3>
                        </div>
                        <div>
                          <td>
                            {data.date.substr(0, 10)} | {data.time}
                          </td>
                        </div>
                        <div>
                          <td>
                            {data.theater} | {data.city}
                          </td>
                        </div>
                        <div>
                          <td>Tickets = {data.count}</td>
                        </div>
                        <div>
                          <td>Cost = {data.cost}</td>
                        </div>
                      </table>
                    </td>
                  </div>
                </div>
                <div className="prevbookitems">
                  <MDBModal
                    tabIndex="-1"
                    show={centredModal1.open}
                    setShow={setCentredModal1.open}
                  >
                    <MDBModalDialog centered size="md">
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            ARE YOU SURE YOU WANT TO CANCEL THE TICKET ?
                          </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>{text}</MDBModalBody>
                        <MDBModalFooter>
                          <button
                            className="modalyes"
                            onClick={() => handleDelete(centredModal1.id)}
                          >
                            Yes
                          </button>
                          <button
                            className="modalyes"
                            id=""
                            onClick={toggleShow1}
                          >
                            No
                          </button>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                  {compareDates1(today, data.date) === 0 && (
                    <button
                      className="deleteticket"
                      id={data._id}
                      onClick={toggleShow1}
                    >
                      <div>
                        <i
                          className="fa-solid fa-trash "
                          id={data._id}
                          style={{ color: "#f84464" }}
                        ></i>
                      </div>
                    </button>
                  )}
                  <MDBModal
                    tabIndex="-1"
                    show={centredModal.open}
                    setShow={setCentredModal.open}
                  >
                    <MDBModalDialog centered size="md">
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            Describe the below questions in 2 lines
                          </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <p className="textarep">Story</p>
                          <textarea
                            className="textarea1"
                            rows="2"
                            cols="40"
                            onChange={(e) => setstory(e.target.value)}
                            value={Story}
                          ></textarea>
                          <p className="textarep">Direction</p>
                          <textarea
                            className="textarea1"
                            rows="2"
                            cols="40"
                            onChange={(e) => setdirection(e.target.value)}
                            value={Direction}
                          ></textarea>
                          <p className="textarep">Muisc</p>
                          <textarea
                            className="textarea1"
                            rows="2"
                            cols="40"
                            onChange={(e) => setMusic(e.target.value)}
                            value={Music}
                          ></textarea>
                        </MDBModalBody>
                        <MDBModalFooter>
                          <p>{review}</p>
                          <button
                            className="modalyes"
                            onClick={() =>
                              handleUpdate(centredModal.id, review)
                            }
                          >
                            Submit
                          </button>
                          <button
                            className="modalyes"
                            id=""
                            onClick={toggleShow}
                          >
                            Cancel
                          </button>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                  {compareDates1(today, data.date) === 1 && (
                    <button
                      className="rateticket"
                      id={data._id}
                      onClick={toggleShow}
                    >
                      <div>
                        <i
                          className="fa-solid fa-magnifying-glass"
                          id={data._id}
                          style={{ color: "#f84464" }}
                        ></i>
                      </div>
                      <p id={data._id}>&nbsp; Write Review</p>
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default PreviousBookings;
