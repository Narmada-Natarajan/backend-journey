const express = require("express")
const server = express()
server.use(express.json())
server.listen(2000, () => {
    console.log("server running")
})

const products = [
    { id: 101, name: "Laptop", price: 25 },
    { id: 102, name: "Phone", price: 75 },

]

server.get("/product", (req, res) => {
    let { id } = req.query

    if (!id) {
        return res.json({ status: false, alert: "id missing" })
    }

    const productdet = products.find((ele) => ele.id == id)

    if (id == null) {
        return res.json({ status: false, alert: "id not found" })
    }
    return res.json({ productdet})

})



