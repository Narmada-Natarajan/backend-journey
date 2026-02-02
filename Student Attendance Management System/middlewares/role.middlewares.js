import users from "../models/user.models.js"
import students from "../models/student.models.js"

export const authTeacher=async (req,res,next)=>{

    let{email,role}=req.body;

    if(!email ||!role){
        return res.status(400).json({
            status:false,
            message:"Invalid Request"
        })
    }

    try{

        const teacher=await users.exists({email:email,role:"teacher"})

        if(teacher!=null){
           return next()
        }

        return res.status(403).json({ //403-->forbidden
            status:false,
            message:"Access Denied"})

    }

    catch(error){
        return res.status(500).json({
            status:false,
            message:"Something went wrong"})
    }

}

export const authStudent=async (req,res,next)=>{

    let{email,role}=req.body;

    if(!email||!role){
        return res.status(400).json({
            status:false,
            message:"Invalid Request"})
    }

    try{

        const student=await students.exists({email:email,role:"student"})

        if(student!=null){
            return next()

        }
        return res.status(403).json({ //403-->forbidden
            status:false,
            message:"Access Denied"})

    }

    catch(error){
        console.log(error)
        return res.status(500).json({
            status:false,
            message:"Something went wrong"}) //500-->server error
    }

}



