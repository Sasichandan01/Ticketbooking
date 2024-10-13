/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setsignup] = useState(0);
  const [error, setError] = useState("");
  const [jwtname, setjwtname] = useState("");
  const [jwtmail, setjwtmail] = useState("");
  const jwttoken = localStorage.getItem("token");

  const localhost = process.env.REACT_APP_LOCALHOST1;
  const backend = process.env.REACT_APP_BACKEND1;
 
  const navigate = useNavigate();

  function handlebutton() {
    setsignup((signup + 1) % 2);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${backend}/usertoken`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        });
        const result = await response.json();

        if (result.success) {
          setjwtmail((prevEmail) => {
            return result.data.email;
          });
          setjwtname((prevUsername) => {
            return result.data.name;
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (jwttoken) {
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwttoken]);

  useEffect(() => {
    if (jwtname && jwtmail && jwttoken) {
      navigate("/home", {
        state: {
          name: jwtname,
          mail: jwtmail,
          newuser: false,
        },
      });
    }
  }, [jwtmail, jwtname, navigate, jwttoken]);


  async function handlesignup(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");
      return;
    }

    try {
      const response = await axios.post(`${backend}/signup`, {
        name: username,
        email: email,
        password: password,
      });
    console.log(response);
    
      if (response.data.success) {
        navigate("/home", {
          state: {
            name: response.data.user.name,
            mail: response.data.user.email,
            newuser: true,
          },
        });
        localStorage.setItem("token", response.data.user.token);
      } else {
        setError(
          response.data.message || "Operation failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError(
        err.response.data.message || "An error occurred. Please try again."
      );
    }
  }
  async function handlelogin(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");
      return;
    }
    try {
      const response = await axios.get(`${backend}/login`, {
        params: {
          email: email,
          password: password,
        },
      });

      if (response.data.success) {
        navigate("/home", {
          state: {
            name: response.data.user.name,
            mail: response.data.user.email,
            newuser: false,
          },
        });
        localStorage.setItem("token", response.data.user.token);
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response.data.message ||
          "An error occurred during login. Please try again."
      );
    }
  }

  return (
    <div className="mainpage">
      <div className="col-md-4 col-md-offset-4" id="login">
        {signup === 1 && (
          <section id="inner-wrapper" className="login">
            <h1>Flix Booking</h1>
            <article>
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user"> </i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="fname"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"> </i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"> </i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>

                <div id="noaccount">
                  <div>
                    <p>Already have an account?</p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-sm"
                      onClick={handlebutton}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  onClick={handlesignup}
                >
                  Signup
                </button>
              </form>
            </article>
          </section>
        )}
        {signup === 0 && (
          <section id="inner-wrapper" className="login">
            <h1>Flix Booking</h1>
            <article>
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"> </i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"> </i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
                <div id="noaccount">
                  <div>
                    <p>No Account?</p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-sm"
                      onClick={handlebutton}
                    >
                      Signup
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  onClick={handlelogin}
                >
                  Login
                </button>
              </form>
            </article>
          </section>
        )}
        {error && (
          <div className="errcontact">
            <p>
              {"{"}&nbsp;Error:&nbsp;{error}&nbsp;
              {"}"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
