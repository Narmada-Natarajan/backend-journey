import users from "../models/user.models.js"

//user Registeration(teacher/student)

export const userRegister = async (req, res) => {

    let { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })
    }

    try {

        const alreadyexist = await users.exists({ email: email })

        if (alreadyexist != null) {

            await users.create({
                name: name,
                email: email,
                password: password,
                role: role
            })

            return res.status(200).json({
                status: true,
                message: "Registration successfull"
            })
        }
        return res.json({
            status:false,
            message:"User alreeady exists"
        })
        
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        })


    }
}

//user Login

export const userLogin=async(req,res)=>{

    let{email,password}=req.body

    if(!email||!password){
        return res.status(400).json({
            status:false,
            message:"Invalid Request"})
    }

    try{

    const validlog=await users.findOne({email:email,password:password})

    if(validlog!=null){
        return res.status(200).json({status:true,message:"Login Successfull", role: users.role})
    }
    return res.status(404).json({
        status:false,message:"User not found or Wrong credentials"
    })
    }

    catch(error){
        console.log(error)
        return res.status(500).json({status:false,message:"Something went wrong"})

    }

}

