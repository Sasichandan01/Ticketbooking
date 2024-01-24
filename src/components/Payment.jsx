import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function Payment() {
  
  const location = useLocation();

  const cost = location.state.totalcost;
  const count = location.state.counts;
  const theater = location.state.theatre;
  const time = location.state.time;
  const date = location.state.date;
  const name = location.state.name;
  const title = location.state.title;
  const photo = location.state.photo;
  const mail = location.state.mail;
  const city = location.state.city;

  const [activeb, setactiveb] = useState(null);
  const [app, setApp] = useState(null);
  const [centredModal, setCentredModal] = useState(false);
  const [number, setNumber] = useState();
  const [tar, settarget] = useState(false);
  const [centredModal1, setCentredModal1] = useState(false);

  var num = cost / count;
  var num1 = cost + 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleselect(data) {
    setactiveb(data);
  }

  return (
    <div id="payment">
      <div className="payment">
        <div className="pay-photo">
          <img
            className="pay-image"
            src={`https://image.tmdb.org/t/p/w500/` + photo}
            height="120"
            width="120"
          />
        </div>
        <div className="pay-content">
          <p>
            <strong>{title}</strong>
          </p>
          <p>
            {date}- {time}
          </p>
        </div>
      </div>

      <div className="payment-cost">
        <div className="pay-cost"></div>
        <div className="pay-cost">
          <p>Cost of each ticket</p>
          <p>
            <i className="fa-solid fa-indian-rupee-sign"></i>
            {num}.00
          </p>
        </div>
        <div className="pay-cost">
          <p>No. of tickets</p>
          <p>{count}</p>
        </div>
        <div className="pay-cost">
          <p>Sub Total</p>

          <p>
            <i className="fa-solid fa-indian-rupee-sign"></i>
            {cost}.00
          </p>
        </div>
        <div className="pay-cost">
          <p>Commission Fee</p>
          <p>
            <i className="fa-solid fa-indian-rupee-sign"></i>
            10.00
          </p>
        </div>
        <hr />
        <div className="pay-cost">
          <p>Total Amount :</p>
          <p>
            <i className="fa-solid fa-indian-rupee-sign"></i> {num1}.00
          </p>
        </div>
        <hr />
        <div className="pay-cost">
          <button
            className="paycost-button"
            name="button1"
            value="google-pay"
            id={activeb === "button1" ? "payid" : "pay"}
            onClick={() => {
              handleselect("button1");
              setApp("Google-pay");
            }}
          >
            <i
              className="fa-brands fa-google-pay fa-2x"
              style={{ color: " #EA4335" }}
            ></i>
          </button>
          <button
            className="paycost-button"
            name="button1"
            value="amazon-pay"
            id={activeb === "button2" ? "payid" : "pay"}
            onClick={() => {
              handleselect("button2");
              setApp("Amazon-pay");
            }}
          >
            <i
              className="fa-brands fa-amazon-pay fa-2x"
              style={{ color: " #333E47" }}
            ></i>
          </button>
          <button
            className="paycost-button"
            name="button1"
            value="visa"
            id={activeb === "button3" ? "payid" : "pay"}
            onClick={() => {
              handleselect("button3");
              setApp("Visa");
            }}
          >
            <i
              className="fa-brands fa-cc-visa fa-2x"
              style={{ color: "#15195A" }}
            ></i>
          </button>
          <button
            className="paycost-button"
            name="button1"
            value="visa"
            id={activeb === "button4" ? "payid" : "pay"}
            onClick={() => {
              handleselect("button4");
              setApp("Apple-pay");
            }}
          >
            <i
              className="fa-brands fa-cc-apple-pay fa-2x"
              style={{ color: " black" }}
            ></i>
          </button>
        </div>
        {activeb && (
          <div className="payconfirm">
            <button
              className="payconfirm-button"
              onClick={() =>
                setTimeout(() => setCentredModal(!centredModal), 100)
              }
            >
              Pay &nbsp;
              <i className="fa-solid fa-indian-rupee-sign"></i>
              &nbsp;
              {num1}.00
            </button>
          </div>
        )}
        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog top size="md">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle></MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="gfg">
                  <div className="gfg-content" id="gfg-content">
                    <div className="pay-details">
                      <input
                        type="number"
                        placeholder="Enter mobile number"
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                      />
                    </div>
                    <div className="pay-details">
                      <input type="checkbox" onClick={() => settarget(!tar)} />
                      <label> &nbsp;I am not a Robot</label>
                    </div>
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                {tar && number?.length === 10 && (
                  <div className="payconfirm">
                    <button
                      className="payconfirm-button"
                      onClick={() =>
                        setTimeout(() => setCentredModal1(!centredModal1), 2000)
                      }
                    >
                      Go....
                    </button>
                  </div>
                )}
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <MDBModal tabIndex="-1" show={centredModal1} setShow={setCentredModal1}>
          <MDBModalDialog top size="md">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle></MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="gfg">
                  <div className="gfg-content" id="gfg-content">
                    <div className="pay-details">
                      <i class="fa-solid fa-circle-check fa-3x"></i>
                    </div>
                    <div className="pay-details">
                      <b>Payment is successful happened through {app}</b>
                      <div className="payconfirm">
                        <Link
                          state={{ name: name, city: city, mail: mail }}
                          to={`/${city}/movie`}
                        >
                          <button className="btn btn-primary  ">
                            <i className="fa-solid fa-house"></i>
                          </button>
                        </Link>
                        {
                          <Link
                            state={{
                              totalcost: cost,
                              counts: count,
                              theatre: theater,
                              time: time,
                              date: date,
                              name: name,
                              title: title,
                              photo: photo,
                              payoption: app,
                              mail: mail,
                              city: city,
                              number: number,
                            }}
                            to="success"
                          >
                            <button className="btn btn-primary  ">
                              Ticket
                            </button>
                          </Link>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter></MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
}

export default Payment;
