import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { createLeave } from "../../../../Redux/Features/LeaveSlice/LeaveSlice";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../../Redux/Features/AuthSlice/AuthSlice";
import { useToast } from "@chakra-ui/react";

function Apply() {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [leaveData, setLeaveData] = useState({
    leavetype: [],
    leavestart: "",
    leaveend: "",
    leavetime: "",
    reason: "",
    status: "Pending",
  });
  console.log("Apply ~ leaveData:", leaveData);
  const [leaveType, setLeaveType] = useState();
  const toast = useToast();

  const options = [
    { value: "paid-half", label: "Paid-Half" },
    { value: "paid-leave", label: "Paid-Leave" },
    { value: "sick-leave", label: "Sick-Leave" },
  ];

  const timeOptions = [
    { value: "9:30 AM to 2:00 PM", label: "9:30 AM to 2:00 PM" },
    { value: "2:00 PM to 6:30 PM", label: "2:00 PM to 6:30 PM" },
  ];

  const levaeTypeHandler = (selectedOption) => {
    setLeaveData({ ...leaveData, leavetype: selectedOption?.value });
    setLeaveType(selectedOption?.value !== "paid-half");
  };

  const leaveHandler = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/leaves/applyleave",
      data: leaveData,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        dispatch(createLeave(res));
        toast({
          title: "Leave Sent Successfully",
          description: "Please Wait Until Boss Approved Your Leave",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => toast.error(err?.message));

    setLeaveData({
      leavetype: [],
      leavestart: "",
      leaveend: "",
      leavetime: "",
      reason: "",
      status: "Pending",
    });

    setLeaveType("");
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      <div className="grid place-content-center h-screen">
        <Container>
          <Card
            style={{
              width: "28rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5" className="pb-3">
                Hello,{" "}
                <span className="text-red-500 capitalize">
                  {user.firstname} {user.lastname}
                </span>
              </CardTitle>
              <Form>
                <Row>
                  <Col>
                    <Label>Leave Type :</Label>
                    <FormGroup>
                      <Select
                        options={options}
                        onChange={(selectedOption) =>
                          levaeTypeHandler(selectedOption)
                        }
                        value={options.find(
                          (option) => option.value === leaveData.leavetype
                        )}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {leaveType ? (
                    <Col md="12">
                      {leaveType ? <Label>Start Leave</Label> : null}
                      <FormGroup>
                        {leaveType ? (
                          <Input
                            type="date"
                            onChange={(e) =>
                              setLeaveData({
                                ...leaveData,
                                leavestart: e?.target?.value,
                              })
                            }
                            value={leaveData.leavestart}
                            required
                          />
                        ) : null}
                      </FormGroup>
                    </Col>
                  ) : (
                    <Col md="6">
                      {leaveType ? <Label>Start Leave</Label> : null}
                      <FormGroup>
                        {leaveType ? (
                          <Input
                            type="date"
                            onChange={(e) =>
                              setLeaveData({
                                ...leaveData,
                                leavestart: e?.target?.value,
                              })
                            }
                            value={leaveData.leavestart}
                            required
                          />
                        ) : null}
                      </FormGroup>
                    </Col>
                  )}

                  <Col>
                    {leaveType ? (
                      <Label>End Leave</Label>
                    ) : (
                      <Label>Leave Date</Label>
                    )}
                    <FormGroup>
                      {leaveType ? (
                        <Input
                          type="date"
                          onChange={(e) =>
                            setLeaveData({
                              ...leaveData,
                              leaveend: e?.target?.value,
                            })
                          }
                          value={leaveData.leaveend}
                          required
                        />
                      ) : (
                        <Input
                          type="datetime-local"
                          onChange={(e) =>
                            setLeaveData({
                              ...leaveData,
                              leavetime: e?.target?.value,
                            })
                          }
                          value={leaveData.leavetime}
                          required
                        />
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="pb-3">
                  <Col md={6}>
                    <Label>Reason</Label>
                    <Input
                      type="textarea"
                      onChange={(e) =>
                        setLeaveData({ ...leaveData, reason: e?.target?.value })
                      }
                      value={leaveData.reason}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Status</Label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setLeaveData({ ...leaveData, status: e?.target?.value })
                      }
                      value={leaveData.status}
                      required
                      style={{
                        color:
                          leaveData.status === "Pending" ? "blue" : "inherit",
                      }}
                    />
                  </Col>
                </Row>
              </Form>
              <div className="flex justify-center">
                <Button
                  color="success"
                  className="w-40"
                  onClick={() => leaveHandler()}
                >
                  Submit
                </Button>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Apply;
