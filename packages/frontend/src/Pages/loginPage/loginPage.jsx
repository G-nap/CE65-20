/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";

import "./loginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import ConditionalLink from "../../Components/common/conditionalLink";
// import { authAction } from "../../store/auth-slice";


function LoginPage() {
  const [user, setUser] = useState();
  const { register, handleSubmit } = useForm();
  const [auth, setAuth] = useState({ token: "", status: false, username: "" })
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.status) {
      const config = {
        params: { username: auth.username },
        headers: { Authorization: `Bearer ${auth.token}` }
      };
      axios.get("http://localhost:5000/user/username",
        config,
      )
        .then(res => {
          console.log("response!");
          console.log(res)
          setUser(res.data)
          // dispatch(authAction.login())
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    if (user)
      navigate('/Workspace');
  }, [auth, user]);

  const doSubmit = (input) => {
    // const doSubmit = (inp) => {
    // const input = { username: "erika4", password: "test123" }
    const params = new URLSearchParams();
    params.append('username', input.username);
    params.append('password', input.password);
    axios.post("http://localhost:5000/auth/auth/login"
      , params,)
      .then(res => {
        setAuth({
          token: res.data.access_token,
          status: true,
          username: input.username
        })
      })
      .catch(function (error) {
        console.log(error);
        alert("Wrong username or password!")
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <img
            src={require("../../Assets/login-img.png")}
            className="card-img-2"
            style={{ transform: "scale(0.7) translate(-10%, 0%)" }}
          />
        </div>
        <div class="col-sm-4 lp" style={{ transform: " translate(0%, 20%)" }}>
          <form onSubmit={handleSubmit(doSubmit)}>
            <p class="head-font ">Welcome back </p>
            <p className="low-font">Sign in to your account</p>

            <div class="form-group text-field my-4">
              <input type="username"
                class="form-control"
                id="exampleInputUsername1"
                aria-describedby="usernameHelp"
                {...register('username', { required: true })}
                required />
              <label>Username</label>
            </div>

            <div class="form-group text-field my-3">
              <input type="password"
                class="form-control"
                id="exampleInputPassword1"
                {...register('password', { required: true })}
                required />
              <label>Password</label>
            </div>

            <div className="d-flex justify-content-between">
              <Link className="link-text">
                <p>Forget Password ?</p>
              </Link>
              <ConditionalLink condition={user} to="/Workspace" style={{ textDecoration: "none" }} >
                <button type="submit" class="btn login-butt">
                  Sign in
                </button>
              </ConditionalLink>
            </div>
            <hr></hr>
            <div className=" d-flex justify-content-center">
              <button type="button" class="btn gg-butt my-2">
                <FcGoogle className="mx-3 gg-icon" /> Sign in with Google
              </button>
            </div>
            <div className="d-flex justify-content-center my-2">
              <p>Don't have an account ? &nbsp;</p>
              <Link to="/Register" style={{ textDecoration: "none" }}>
                <p>Sign up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default LoginPage;
