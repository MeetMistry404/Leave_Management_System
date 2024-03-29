const Leave = require("../Model/leave_model");

const applyLeave = async (req, res) => {
  try {
    const { leavetype, leavestart, leaveend, leavetime, status, reason } =
      req.body;
    const userId = req.userId;

    const leave = await Leave.create({
      leavetype,
      leavestart,
      leaveend,
      leavetime,
      status,
      reason,
      user: userId,
    });
    res.status(200).json({ message: "leave applied successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "error applying leave" });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Leave.find({ user: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const leaveUpdate = async (req, res) => {
  try {
    const { leavetype, startdata, leaveend, leavetime, status, reason } =
      req.body;

    const user = await Leave.findByIdAndUpdate(
      req.params.id,
      { leavetype, startdata, leaveend, leavetime, status, reason },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Leave not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const adminLeave = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("user", "firstname lastname");
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { applyLeave, getAll, leaveUpdate, adminLeave };
