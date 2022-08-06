import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const tokenData = localStorage.getItem("token");
  let isValidToken = false;

  const checkToken = () => {
    if (tokenData != null) {
      let tokenInfo: TokenInfo | null = null;
      try {
        tokenInfo = JSON.parse(tokenData);
      } catch {}
      console.log(Date.parse(tokenInfo!.expired!) > new Date().valueOf());
      if (tokenInfo != null) {
        if (Date.parse(tokenInfo.expired!) > new Date().valueOf()) {
          isValidToken = true;
        }
      }
    }
  };

  checkToken();

  useEffect(() => {
    checkToken();
  });

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Games">Games</Link>
        </li>
        {isValidToken ? (
          <>
            <li className="right-li">
              <Link to="/Manage">Manage</Link>
            </li>
            <li
              className="right-li"
              onClick={() => {
                localStorage.removeItem("token");
                isValidToken = false;
              }}
            >
              <Link to="/">Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li className="right-li">
              <Link to="/Login">Login</Link>
            </li>
            <li className="right-li">
              <Link to="/Register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
