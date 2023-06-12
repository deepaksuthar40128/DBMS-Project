import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handlePublicKey = (e) => {
    console.log("me");
    e.preventDefault();
    let challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);
    let options = {
      publicKey: {
        challenge: challenge,
        userVerification: 'required',
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          requireResidentKey: false,
          userVerification: 'required'
        }
      }
    };
    navigator.credentials.get(options).then(async (credential) => {
      let key = credential.id;
      try {
        await login({ key });
        navigate("/");
      } catch (err) {
        setErr(err.response.data);
      }
    }).catch(function (error) {
      let err = new Error(error.message.split('.')[0]);
      console.log(err);
    });
  }



  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
            {window.PublicKeyCredential && <button onClick={handlePublicKey}>Public Key</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
