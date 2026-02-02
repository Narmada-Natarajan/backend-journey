import attendance from "../models/attendance.models.js"
import Students from "../models/student.models.js"



//mark attendance

export const markAttendance = async (req, res) => {

    let { studentId, date, status } = req.body

    if (!studentId || !date || !status) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    try {
        const student = await Students.findOne({})
    }
    catch(error){

    }

}



