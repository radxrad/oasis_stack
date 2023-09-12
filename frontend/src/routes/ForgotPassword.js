import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import {getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../lib/helpers";

export default function SignIn(props) {
    const history = useHistory();
    const { setUser } = useAuthContext();
    let location = useLocation();
  let { from } = location.state || { from: { pathname: "/user" } };

  const [username,setUsername] = useState();
  const [message,setMessage] = useState();
  //const [user, setUser] = useState(localStorage.getItem("user"));
  const handleUsername = (e)=> setUsername(e.target.value);

  //const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const onFinish =  async (e) => {
    e.preventDefault();
    setIsLoading(true);
      axios
          .post(getStrapiURL('/api/auth/forgot-password'), {
              email: username, // user's email
          })
          .then(response => {
              console.log('Your user received an email');
              setMessage("You should receive an email")
              setIsLoading(false);
              history.push("/signin")
          })
          .catch(error => {
              console.log('An error occurred:', error.response);
              setMessage("Failed to Find User or other issue")
              setIsLoading(false);
          });

  };


  return (
      <Fragment>
    <div className="signin light-bg max-window">
      <Form className="signup__container">
        <div className="signup__header">Forgot Password</div>
        <Form.Group>
          <Form.Control
            type="email"
            className="signup__textbox"
            placeholder="email"
            value={username}
            onChange={handleUsername}
          />
        </Form.Group>
        <div className="controls">
          <Button
            className="btn--lg"
            type="submit"
            onClick={onFinish}
          >
            Send Email {isLoading && <Spinner size="small" />}
          </Button>

        </div>
          {message ? (
              <div className="py-2">
                  <div className="alert alert-danger error-msg">{message}</div>
              </div>
          ) : (
              ""
          )}
      </Form>
    </div>
      </Fragment>
  );
}
