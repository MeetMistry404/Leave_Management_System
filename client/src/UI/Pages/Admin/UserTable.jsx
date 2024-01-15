import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateLeave } from "../../../../Redux/Features/LeaveSlice/LeaveSlice";
import "./Admin.css";
import moment from "moment";

function UserTable() {
  const [leavedata, setLeaveData] = useState();
  const [getdata, setGetData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/leaves/getbyadmin",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => setLeaveData(res?.data))
      .catch((err) => console.log("err", err?.message));
  }, []);

  const editHandler = (data, index) => {
    setGetData({ ...data, index });
    onOpen();
  };

  const updateHandler = (decision) => {
    axios({
      method: "put",
      url: `http://localhost:8000/leaves/update/${getdata?._id}`,
      data: { status: decision }, // Only send the updated status
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        // Assuming the response contains the updated leave data
        const updatedLeave = res.data;

        const updatedLeaveData = [...leavedata];
        updatedLeaveData[getdata?.index].status = updatedLeave.status;

        setLeaveData(updatedLeaveData);

        dispatch(
          updateLeave({
            status: updatedLeave.status,
            index: getdata?.index,
          })
        );
        toast({
          title: "Update Successful",
          description: "Leave is successfully updated",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) =>
        toast({
          title: "Update Failed",
          description: err?.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      );

    onClose();
  };

  return (
    <>
      <div className="table-col rounded-md">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Sr</Th>
                <Th>Name</Th>
                <Th>Leave Type</Th>
                <Th>Start Leaves</Th>
                <Th>End Leaves</Th>
                <Th>Leave Date</Th>
                <Th>Reason</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leavedata?.map?.((e, i) => {
                return (
                  <Tr key={e._id}>
                    <Td>{i + 1}</Td>
                    <Td className="max-w-sm">
                      {e.user.firstname} {e.user.lastname}
                    </Td>
                    <Td>{e?.leavetype}</Td>
                    <Td>{moment(e.leavestart).format(" Do MMMM YYYY")}</Td>
                    <Td>{moment(e.leaveend).format("Do MMMM YYYY")}</Td>
                    <Td className="max-w-sm">
                      {moment(e.leavetime).format("lll")}
                    </Td>
                    <Td>{e.reason}</Td>
                    <Td
                      className={`status-cell ${e?.status.toLowerCase()} font-bold`}
                    >
                      {e.status}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => editHandler(e, i)}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Change Status
              </AlertDialogHeader>

              <AlertDialogBody>
                Hello boss, choose what you want..
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => updateHandler("Approve")}
                  colorScheme="green"
                >
                  Approve
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => updateHandler("Reject")}
                  ml={3}
                >
                  Reject
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </>
  );
}

export default UserTable;
