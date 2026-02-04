import attendance from "../models/attendance.models.js"
import Students from "../models/student.models.js"



//Mark Attendance (Teacher)

import Attendance from "../models/attendance.model.js"

export const markAttendance = async (req, res) => {

  const { studentId, date, status } = req.body

  if (!studentId || !date || !status) {
    return res.status(400).json({ status: false, message: "Invalid Request" })
  }

  try {
    await Attendance.create({ studentId, date, status })
    res.json({ status: true, message: "Attendance marked" })

  } catch (error) {
    res.status(409).json({
      status: false,
      message: "Attendance already marked for this date"
    })
  }
}



// View Attendance (Student)

export const viewAttendancePercentage = async (req, res) => {

  const { studentId } = req.body

  const records = await Attendance.find({ studentId })

  if (records.length === 0) {
    return res.json({ status: false, message: "No records found" })
  }

  const present = records.filter(r => r.status === "present").length
  const percentage = (present / records.length) * 100

  res.json({
    status: true,
    attendancePercentage: percentage.toFixed(2) + "%"
  })
}

