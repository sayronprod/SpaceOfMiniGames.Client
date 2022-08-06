import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../app/hooks";
import "./Header.css";

const Header = () => {
  const [tokenData, setTokenData] = useLocalStorage("token", null);

  const checkToken = () => {
    let tokenObj;
    try {
      const item = localStorage.getItem("token");
      tokenObj = item ? JSON.parse(item) : null;
    } catch {
      tokenObj = null;
    }
    let tokenInfo: TokenInfo | null = tokenObj as TokenInfo;
    if (tokenInfo != null) {
      if (tokenInfo != null) {
        if (Date.parse(tokenInfo.expired!) > new Date().valueOf()) {
          return true;
        }
      }
    }
    return false;
  };

  const [isValidToken, setIsValidToken] = useState(() => checkToken());

  useEffect(() => {
    window.addEventListener("storage", () => {
      setIsValidToken(checkToken());
    });
  }, []);

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
                setTokenData(null);
                setIsValidToken(false);
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
