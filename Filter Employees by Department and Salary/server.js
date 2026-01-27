//Problem-4: Filter Employees by Department and Salary

const express=require("express")
const server=express()
server.use(express.json())

server.listen(5000,()=>{
    console.log("server active")
})

const employees = [
  {
    "did": 101,
    "name": "Arjun Mehta",
    "salary": 75000,
    "department": "Engineering"
  },
  {
    "did": 102,
    "name": "Sarah Jenkins",
    "salary": 82000,
    "department": "Marketing"
  },
  {
    "did": 103,
    "name": "Leo Kwang",
    "salary": 68000,
    "department": "Design"
  }
];

//Route parameter and Query Parameter

server.get("/departments/:did/emp",(req,res)=>{

    let{did}=req.params;
    let{minsalary,maxsalary}=req.query;

const det=employees.filter((ele)=>ele.did==did && (ele.salary>=minsalary && ele.salary<=maxsalary))

if(det==null){
    return res.status(404).json({
        status:false,
        response:"employee not found"
    })
}
return res.status(200).json({
    response:det
})

})

