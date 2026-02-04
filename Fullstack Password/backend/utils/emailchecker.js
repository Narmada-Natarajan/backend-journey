 export const Emailchecker = (email)=>{
    const Exp = new RegExp("^[a-z]{1}[a-z0-9\-\.]*@[a-z]{2,}\.[a-z]{2,}$")
    return Exp.test(email)
   
}


