import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./Header.css";
import { checkToken } from "./../../helpers/tokenHelper";
import { useAppDispatch } from "./../../hooks/redux";
import { tokenSlice } from "./../../store/reducers/TokenSlice";

const Header = () => {
  const { userToken } = useAppSelector((state) => state.tokenReducer);
  const dispatch = useAppDispatch();
  const { clearToken } = tokenSlice.actions;

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Games">Games</Link>
        </li>
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
  );
};

export default Header;
