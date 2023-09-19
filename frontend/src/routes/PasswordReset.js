import React, { Fragment, useState } from "react";
import {useLocation, useParams} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import {getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../lib/helpers";

export default function PasswordReset(props) {
    const history = useHistory();
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)


const code = queryParameters.get("code");
    const [password,setPassword] = useState();
  const [passwordConfirmation,setPasswordConfirmation] = useState();
    const [message,setMessage] = useState();
  //const [user, setUser] = useState(localStorage.getItem("user"));
  const handlePassword = (e)=> setPassword(e.target.value);
    const handlePasswordConfirmation = (e)=> setPasswordConfirmation(e.target.value);
  //const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const onFinish =  async (e) => {
    e.preventDefault();
    setIsLoading(true);
      axios
          .post(getStrapiURL(`/api/auth/reset-password?code={code}`), {
              code: code,
              password: password,
              passwordConfirmation: passwordConfirmation,
          })
          .then(response => {
              console.log('password changed');
              setMessage("Password Changed")
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
      <div className="signin light-bg max-window">
          <Form className="signup__container">
              <div className="signup__header">New Password</div>
          <Form.Control
              type="password"
              className="signup__textbox"
              placeholder="New Password"
              value={password}
              onChange={handlePassword}
          />
              <div className="signup__header">Confirm Password</div>
          <Form.Control
              type="password"
              className="signup__textbox"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmation}
          />
              <div className="controls">
                  <Button
                      className="btn--lg"
                      type="submit"
                      onClick={onFinish}
                  >
                      Reset Password {isLoading && <Spinner size="small" />}
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
  );
}
