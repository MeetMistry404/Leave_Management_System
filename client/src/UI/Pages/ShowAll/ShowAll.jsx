import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "../../../../Redux/Features/LeaveSlice/LeaveSlice";
import { Container, Table } from "reactstrap";
import "./ShowAll.css";

function ShowAll() {
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leaveReducer);
  useEffect(() => {
    dispatch(fetchLeaves());
  }, []);

  return (
    <>
      <div className="py-24">
        <Container>
          <div>
            <h1>All Leaves</h1>
            <hr />
          </div>
          <div>
            <Table hover>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Leave Time/Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves?.map((e, i) => {
                  return (
                    <tr key={e._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{e.leavetype}</td>
                      <td>{e.leavestart || "--"}</td>
                      <td>{e.leaveend || "--"}</td>
                      <td>{e.leavetime || "--"}</td>
                      <td className="font-medium">{e.reason}</td>
                      <td
                        className={`status-cell ${e?.status?.toLowerCase()} font-bold`}
                      >
                        {e.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ShowAll;
