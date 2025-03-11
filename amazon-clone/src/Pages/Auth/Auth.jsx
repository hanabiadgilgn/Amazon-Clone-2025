import React, { useState, useContext} from 'react'
import classes from './Signup.module.css'
import { Link, useNavigate } from "react-router-dom"
import { auth } from '../../Utility/firebase.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { DataContext} from '../../Components/DataProvider/DataProvider.jsx'
import { Type } from '../../Utility/action.type.js'
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] =useState({
    signIn: false,
    signUp: false
  })

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate()
  // console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signIn") {
      // firebase authtication
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo)
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
            setLoading({ ...loading, signUp: false });
            navigate("/");
        })
        .catch((err) => {
          setError(err.message)
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  console.log(email, password);

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      {/* Form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <lable htmlFor="email">Email</lable>
            {/* this kind of inpute called controlled inpute b/c we the inpte throgh useState */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <lable htmlFor="password">Password</lable>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signIn"
            onClick={authHandler}
            className={classes.login__signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
          {/* Agreement */}
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based ads Notice.
          </p>
          <button
            type="submit"
            name="signUp"
            onClick={authHandler}
            className={classes.login__registerButton}
          >
            {loading.signUp ? <ClipLoader color="#000" size={15} /> : " Create your Amazon Account"}
          </button>
          {/* error message comes from firebase */}
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </form>
      </div>
    </section>
  );
}

export default Auth