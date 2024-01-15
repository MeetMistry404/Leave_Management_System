app.get("/api/getLeaveDataWithUserDetails", (req, res) => {
  const leaveDataWithUserDetails = db.leaves.map((leave) => {
    const user = db.users.find((u) => u.id === leave.userId);
    return {
      ...leave,
      username: `${user.firstname} ${user.lastname}`,
    };
  });

  res.json(leaveDataWithUserDetails);
});
