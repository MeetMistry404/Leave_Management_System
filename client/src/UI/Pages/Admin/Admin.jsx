import React from "react";
import { Container } from "reactstrap";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

function Admin() {
  return (
    <>
      <div className="py-24 admin">
        <Container>
          <UserTable />
          {/* <UserForm /> */}
        </Container>
      </div>
    </>
  );
}

export default Admin;
