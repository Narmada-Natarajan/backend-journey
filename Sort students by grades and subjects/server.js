//Get Students Grades with Sorting 

const express = require("express")
const server = express()
server.use(express.json())
server.listen(5000, () => {
    console.log("Server is Runnning")
})

const sgrades = [
    {
        sid: 1,
        subject: "Math",
        grade: 100
    },
    {
        sid: 1,
        subject: "Science",
        grade: 90
    },
    {
        sid: 1,
        subject: "English",
        grade: 80
    },
]

server.get("/students/:sid/grades", (req, res) => {
    let { sid } = req.params
    let { sortBy } = req.query 

    if (!sid) {
        return res.status(404).json
            ({
                status: false,
                response: "student ID missing"
            })
    }

    const studentinfo = sgrades.filter((ele) => ele.sid == sid )

    if (studentinfo == null) {
        return res.status(404).json
            ({
                status: false,
                response: "student not found"
            })
    }
    if (sortBy=="grades"){
        studentinfo.sort((a,b)=>a.grade-b.grade)
    }
    else if(studentinfo=="subject"){
        studentinfo.sort((a,b)=>a.grade-b.grade)

    }
    return res.status(200).json
        ({
      
            response: studentinfo

        })

})

