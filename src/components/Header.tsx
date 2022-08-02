import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Games">Games</Link>
        </li>
        <li className="right-li">
          <Link to="/Login">Login</Link>
        </li>
        <li className="right-li">
          <Link to="/Register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
