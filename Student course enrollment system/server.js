import express from "express"
import { connectDB } from "./config/db.config.js"
import {userLogin} from "./controllers/login.contollers.js"

const server=express()

server.use(express.json())

server.listen(5000, () => {
    console.log("server is running")
    connectDB()
})

//User Login and Authentication

server.post("/login", userLogin)

// Add  course(Admin Only)

server.post("/add-course", (req, res) => {

    let { email, password, CourseID, CourseName, Coursedescription, Courseduration } = req.body

    if (!email || !password || !CourseID || !CourseName || !Coursedescription || !Courseduration) {
        return res.json({ message: "Invalid Request" })
    }

    const coursed = users.find((i) => i.email == email)

    if (coursed == null) {
        return res.json({ message: "User not found" })
    }

    if (coursed.role == "admin") {

        const newcourse = {

            courseId: CourseID,
            courseName: CourseName,
            description: Coursedescription,
            duration: Courseduration
        }

        courses.push(newcourse)
        return res.json({ message: "New course added successfully" })

    }
    return res.json({ message: "Only admin can add course" })

})

// Student only can enroll in course

server.post("/enroll-course", (req, res) => {

    let { email, password, enrollmentId, courseId } = req.body

    if (!email || !password || !enrollmentId || !courseId) {
        return res.json({ message: "Invalid Request" })
    }

    const courseenr = users.find((i) => i.email == email)

    if (courseenr == null) {
        return res.json({ message: "Student not found" })
    }
    if (courseenr.password != password) {
        return res.json({ message: "Invalid Password" })

    }

    if (courseenr.role == "student") {

        const enr = courses.find((i) => i.courseId == courseId)

        if (enr == null) {
            return res.json({ message: "course not found" })
        }

        //if course exists 

        const newenr = {

            enrollmentId: enrollmentId,
            studentEmail: email,
            courseId: courseId
        }

        enrollments.push(newenr)
        return res.json({ message: "New course enrolled successfully" })

    }
    return res.json({ message: "Only Students can enroll course" })

})

//View My Enrolled Courses

server.get("/my-courses", (req, res) => {

    let { email, password, enrollmentId, courseId } = req.body

    if (!email || !password || !enrollmentId || !courseId) {
        return res.json({ message: "Invalid Request" })
    }

    const senr = users.find((i) => i.email == email)

    if (senr == null) {
        return res.json({ message: "Student not found" })
    }

    if (senr.password != password) {
        return res.json({ message: "Invalid Password" })

    }

    if (senr.role == "admin") {
        return res.json({ message: "Admin cannnot access" })
    }

    if (senr.role == "student") {
        const enr = enrollments.find((i) => i.studentEmail == email)

        if (enr == null) {
            return res.json({ message: "no enrollments" })
        }

        return res.json({ enr })

    }

})

// View all enrollments

server.get("/all-enrollments", (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.json({ message: "Invalid Request" })
    }

    const userdet = users.find((i) => i.email == email)

    if (userdet == null) {
        return res.json({ message: "User not found" })
    }

    if (userdet.password != password) {
        return res.json({ message: "Invalid Password" })
    }

    if (userdet.role == "admin") {

        return res.json({ enrollments })

    }
    return res.json({ message: "Only admin can view enrollments" })

})
