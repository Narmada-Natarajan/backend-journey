const express=require("express")
const server=express()
server.use(express.json())
server.listen(1000,()=>{
    console.log("server running")
})

server.get("/math",(req,res)=>{
    const{a,b,type}=req.query
    if(!a||!b){
        res.json({alert:"Numbers missing"})
    }
    if(!type){
        res.json({alert:"missing type"})
    }
    if(isNaN(a)||isNaN(b)){
        res.json({alert:"Not a Number"})
    }

    if(type=="add"){
        const sum=Number(a)+Number(b)
        res.json({sum:sum})
    }
    else if(type=="sub"){
        const dif=Number(a)-Number(b);
        res.json({difference:dif})
    }
    else if(type=="mul"){
        const pro =Number(a)*Number(b);
        res.json({product:pro})
    }
    else if(type=="div"){
        if(Number(b)==0){
        res.json({alert:"Not Defined"})
    }

        const divide=Number(a)/Number(b);
        res.json({division:divide})
    }
    else{
        res.json({alert:"Invalid type"})
    }



})