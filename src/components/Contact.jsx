/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [signup, setsignup] = useState(0);
  const [error, setError] = useState("");
  const [jwtname, setjwtname] = useState("");
  const [jwtmail, setjwtmail] = useState("");
  const jwttoken = localStorage.getItem("token");
  //const google_client_id = process.env.REACT_APP_CLIENT_ID;
  const localhost = process.env.REACT_APP_LOCALHOST1;
  const backend = process.env.REACT_APP_BACKEND1;
  //const redirect_url = process.env.REACT_APP_LOCALHOST1;
  const navigate = useNavigate();

  function handlebutton() {
    if(signup === 0 || signup===-1) {
      setsignup(1);
    }
    else {
      setsignup(0);
    }
  }
  function handlebutton1() {
    setsignup(-1);
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
          newuser: 1,
        },
      });
    }
  }, [jwtmail, jwtname, navigate, jwttoken]);

  async function handlesignup(e) {
    e.preventDefault();
    setError("");
    if (username.length === 0) {
      setError("Please enter username");
      return;
    }
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (email.length === 0) {
      setError("Please enter email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");
      return;
    }

    try {
      setError("Loading, Please Wait .....");
      const response = await axios.post(`${backend}/signup`, {
        name: username,
        email: email,
        password: password,
      });

      if (response.data.success) {
        navigate("/home", {
          state: {
            name: response.data.user.name,
            mail: response.data.user.email,
            newuser: response.data.user.newuser,
          },
        });
        localStorage.setItem("token", response.data.user.token);
        setError("");
      } else {
        setError(
          response.data.message || "Operation failed. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response.data.message || "An error occurred. Please try again."
      );
    }
  }
  async function handlelogin(e) {
    e.preventDefault();
    setError("");
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (email.length === 0) {
      setError("Please enter email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");
      return;
    }
    try {
      setError("Loading, Please Wait .....");
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
            newuser: 1,
          },
        });
        localStorage.setItem("token", response.data.user.token);
        setError("");
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
  async function handlenewp(e) {
    e.preventDefault();
    setError("");
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (email.length === 0) {
      setError("Please enter email");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain atleast 8 characters");
      return;
    }
    if (password !== newpassword) { 
      setError("Password and confirm password must be same");
      return;
    }
    try {
      setError("Loading, Please Wait .....");
      const response = await axios.put(`${backend}/updatepassword`, {
        email: email,
        password: password,
      });

      if (response.data.success) {
        navigate("/home", {
          state: {
            name: response.data.user.name,
            mail: response.data.user.email,
            newuser: -1,
          },
        });
        localStorage.setItem("token", response.data.user.token);
        setError("");
      } else {
        setError(
          response.data.message || "Updation failed. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response.data.message ||
          "An error occurred during changing password. Please try again."
      );
    }
  }
  // const handleSuccess = (response) => {
  //   const accessToken = response.credential;
  //   localStorage.setItem("google_access_token", accessToken);
  //   fetchUserProfile(accessToken);
  // };
  // const fetchUserProfile = (token) => {
  //   fetch(
  //     `https://accounts.google.com/o/oauth2/v3/userinfo`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((userData) => {
  //       console.log("User email:", userData.email);
  //       console.log("User ID:", userData.sub);
  //     })
  //     .catch((error) => console.error("Error fetching user info:", error));
  // };
  // const handleFailure = (response) => {
  //   console.error("Login failed:", response);
  // };
  return (
    <div className="mainpage">
      <div className="col-md-4 col-md-offset-4" id="login">
        {signup === -1 && (
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
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"> </i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="password"
                      onChange={(e) => setnewPassword(e.target.value)}
                      value={newpassword}
                    />
                  </div>
                </div>{" "}
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
                  onClick={handlenewp}
                >
                  Submit
                </button>
              </form>
            </article>
          </section>
        )}
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
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                <div id="noaccount">
                  <button
                    type="submit"
                    id="forgotbutton"
                    onClick={handlebutton1}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </article>
          </section>
        )}
        {error && (
          <div className="errcontact">
            <p>
              {"{"}&nbsp;Status:&nbsp;{error}&nbsp;
              {"}"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
