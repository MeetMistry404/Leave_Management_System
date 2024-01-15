import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "reactstrap";
import "../HeaderCom/HeaderCom.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../Redux/Features/AuthSlice/AuthSlice";

function HeaderCom() {
  const { token, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [token, dispatch]);

  return (
    <>
      <Container>
        <ol className="flex gap-4 fixed my-4 px-0 text-lg font-medium">
          {token && user.usertype === "admin" ? (
            <li>
              <NavLink to={"/admin"}>Admin</NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
            </>
          )}
          {token && user?.usertype === "employee" ? (
            <>
              <li>
                <NavLink to={"/showall"}>Show All</NavLink>
              </li>
              <li>
                <NavLink to={"/apply"}>Apply</NavLink>
              </li>
            </>
          ) : null}
          {token ? (
            <li>
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          )}
        </ol>
      </Container>
    </>
  );
}

export default HeaderCom;
