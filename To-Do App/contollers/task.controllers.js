import Tasks from "../models/task.models.js"

export const newTask = async (req, res) => {

    let { taskname, priority, status, email} = req.body
    

    if (!taskname || !priority || !status ||!email) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    const tid=Math.floor(Math.random()*1000)

    try {
        await Tasks.create({
            taskid:tid,
            taskname:taskname,
            priority:priority,
            status:status,
            createdby:email

        })
    
        return res.status(201).json({ status: true, message: "New task created succesfully" })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message:"Task cannot be created" })
    }
}

export const readTask= async (req,res)=>{

    let{email,password}=req.body

    if(!email){
        return res.json({
            status:false, message:"Invalid Request"
        })
    }

    const tid=await Tasks.find({createdby:email})

    if(tid!=null){
        return res.json({status:true,message:"success",task:tid})
    }
    return res.json({
        status:false,
        message:"Cannot view Task"
    })

}

export const updateTask=async(req,res)=>{

    let{taskid,taskname,priority,status,email,password}=req.body

    if(!taskid||!taskname||!priority||!status||!email){
        return res.status(401).json({
            status:false,
            message:"Invalid Request"
        })
    }

    const t=await Tasks.exists({taskid,createdby:email})

    if(t==null){
        return res.status(404).json({status:true,message:"Task not found"})
    }

    try{
        await Tasks.updateOne({taskid:taskid},{$set:{taskname,priority,status}})
        return res.json({status:true,message:"Task updated sucessfully"})
    }

    catch(error){
        console.log(error)
        return res.json({status:false,message:"Cannot Update Task"})
    }

}

export const deleteTask=async(req,res)=>{

    let{taskid,email,password}=req.body

    if(!taskid||!email){
        return res.json({status:false,message:"Invalid Request"})
    }

    const ti=await Tasks.findOne({taskid,createdby:email})

    if(ti==null){
        return res.json({status:false,message:"Task not found"})
    }
    try{
        await Tasks.deleteOne({taskid})
        return res.json({status:true,message:"Task deleted sucessfully"})
    }
    catch(error){
        return res.json({status:true,message:"Task cannot be deleted"})
    }
}
