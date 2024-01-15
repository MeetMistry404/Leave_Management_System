import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { login } from "../../../../Redux/Features/AuthSlice/AuthSlice";

function SignUp() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    thumbnail: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/user/register",
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(login(res.data));
        navigate("/");
      })
      .catch((err) => console.log("err", err?.message));
  };

  return (
    <div className="grid place-content-center bg-orange-100 h-screen">
      <Container>
        <div className="w-[780px]">
          <Form className="mb-4">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstname">Firstname</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    placeholder="Enter Lastname"
                    type="text"
                    value={userData?.firstname}
                    onChange={(e) =>
                      setUserData({ ...userData, firstname: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastname">Lastname</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Enter Lastname"
                    type="text"
                    value={userData?.lastname}
                    onChange={(e) =>
                      setUserData({ ...userData, lastname: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    type="email"
                    value={userData?.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    value={userData?.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="role">role</Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="Enter your role"
                    type="text"
                    onChange={(e) =>
                      setUserData({ ...userData, role: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Phone">Phone</Label>
                  <Input
                    id="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    type="number"
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    type="text"
                    onChange={(e) =>
                      setUserData({ ...userData, address: e?.target?.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button color="success" onClick={() => registerHandler()}>
              Sign Up
            </Button>
          </Form>
          <Link to={"/signup"}>Already have an accout..? Login</Link>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
