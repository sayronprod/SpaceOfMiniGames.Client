import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./Header.css";
import { checkToken } from "./../../helpers/tokenHelper";
import { useAppDispatch } from "./../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";

const Header = () => {
  const { userToken } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { clearToken } = userSlice.actions;

  return (
    <div className="navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Games">Games</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          {checkToken(userToken) ? (
            <>
              <li
                className="right-li"
                onClick={() => {
                  dispatch(clearToken());
                }}
              >
                <Link to="/">Sign Out</Link>
              </li>
              <li className="right-li">
                <Link to="/Manage">Manage</Link>
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
    </div>
  );
};

export default Header;
