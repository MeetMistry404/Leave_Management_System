import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import {
  fetchUserData,
  login,
} from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useToast } from "@chakra-ui/react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8000/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      });

      console.log(".then ~ res:", res);
      dispatch(login(res.data));

      if (res?.data?.user?.usertype === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast({
        title: "Login Successfully",
        description: "Thank you, for visit",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Invalid Email or Password",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="grid place-content-center h-screen bg-blue-200">
        <Container>
          <Form className="w-96 mb-3">
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                value={userData?.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e?.target?.value })
                }
              />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={userData?.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e?.target?.value })
                }
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>{" "}
            <Button color="success" onClick={() => loginHandler()}>
              Submit
            </Button>
          </Form>
          <Link to={"/signup"}>Dont't have an accout..? Signup</Link>
        </Container>
      </div>
    </>
  );
}

export default Login;
