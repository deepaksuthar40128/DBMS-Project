import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>HELLO APP</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HomeOutlinedIcon /></Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
      </div>
      <div className="right">
        <Link to={`/profile/${currentUser.id}`}>
          <div className="user">
            <img
              src={currentUser.profilePic ?  currentUser.profilePic : '/imgs/dummy-avatar.jpg'}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
            <div className="logout">
              <button onClick={logout}>LOGOUT</button>
            </div>
      </div>
    </div>
  );
};

export default Navbar;
