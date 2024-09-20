/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import react, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState([]);

  const location = useLocation();

  const name = location.state.name;
  const mail = location.state.mail;

  const today = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const [review, setreview] = useState("");
  const [centredModal, setCentredModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://ticketbooking-backend-6152.onrender.com/api/auth")
      .then((response) => {
        const data = response.data.data;

        if (Array.isArray(data)) {
          setUsers(data);

          const filtered = data.filter(
            (user) => user.name === name && user.mail === mail
          );
          setFilteredUsers(filtered);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      })
      .catch((err) => console.log(err));
  }, [filteredUsers]);

  const handleUpdate = async (movieId, review) => {
    try {
      const response = await fetch(
        `https://ticketbooking-backend-6152.onrender.com/api/auth/${movieId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review }), // Ensure review is an object
        }
      );

      setCentredModal(0);

      console.log(response);
      if (response.ok) {
      }
    } catch (err) {
      console.error("Error updating movie:", err);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(
        `https://ticketbooking-backend-6152.onrender.com/api/auth/${movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setFilteredUsers((prevItems) =>
          prevItems.filter((_, i) => i !== movieId)
        );
      } else {
        console.log("Failed to delete movie");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const toggleShow = () => {
    setCentredModal(!centredModal);
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
        {filteredUsers.length !== 0 && <h3>Previous Bookings</h3>}
        {filteredUsers.length === 0 && <h3>No Previous Bookings</h3>}
      </div>
      <div>
        <div className="prevtable">
          {filteredUsers &&
            filteredUsers.map((data) => (
              <div key={data.id} className="prevbookdata">
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
                  {compareDates1(today, data.date) === 0 && (
                    <button
                      className="deleteticket"
                      onClick={() => handleDelete(data._id)}
                    >
                      <div>
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "grey" }}
                        ></i>
                      </div>
                      <p>&nbsp;Cancel Ticket</p>
                    </button>
                  )}
                  <MDBModal
                    tabIndex="-1"
                    show={centredModal}
                    setShow={setCentredModal}
                  >
                    <MDBModalDialog centered size="md">
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            Enter your opinion on the film
                          </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <textarea
                            className="textarea"
                            rows="6"
                            cols="40"
                            onChange={(e) => setreview(e.target.value)}
                            value={review}
                          ></textarea>
                        </MDBModalBody>
                        <MDBModalFooter>
                          <button
                            className="close"
                            onClick={() => handleUpdate(data._id, review)}
                          >
                            Submit
                          </button>
                          <button className="close" onClick={toggleShow}>
                            Cancel
                          </button>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                  {compareDates1(today, data.date) === 1 && (
                    <button className="rateticket" onClick={toggleShow}>
                      <div>
                        <i
                          class="fa-solid fa-magnifying-glass"
                          style={{ color: "grey" }}
                        ></i>
                      </div>
                      <p>&nbsp; Add Review</p>
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
