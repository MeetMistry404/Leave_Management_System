import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import {
  fetchUserData,
  logout,
} from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useToast } from "@chakra-ui/react";

function Profile() {
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const logoutHandler = () => {
    disaptch(logout());
    navigate("/login");
    toast({
      title: "Logout Successfully",
      description: "Thank You, Visit Again",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    disaptch(fetchUserData());
  }, []);

  const { user } = useSelector((state) => state.authReducer);
  console.log("Profile ~ user:", user);

  return (
    <div className=" h-screen grid place-content-center">
      <Card
        style={{
          width: "",
        }}
        className="image-block shadow-xl"
      >
        <CardBody>
          <CardTitle
            tag="h2"
            className="pt-2 text-center uppercase text-white text-8xl drop-shadow-2xl pb-4"
          >
            {user.firstname} {user.lastname}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-center col capitalize text-4xl text-black drop-shadow-lg"
            tag="h6"
          >
            {user.role}
          </CardSubtitle>

          <div className="text-center lowercase text-xl">{user.email}</div>

          <div className="flex justify-center">
            <Button
              color="danger"
              onClick={() => logoutHandler()}
              className="mt-3"
            >
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
