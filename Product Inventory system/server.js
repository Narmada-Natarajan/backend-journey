import express from "express"

const server = express()

server.use(express.json())

server.listen(5000, () => {
    console.log("server active")
})

const users = [
    {
        email: "admin@store.com",
        password: "admin123",
        name: "Store Admin",
        role: "admin"
    },
    {
        email: "user@store.com",
        password: "user123",
        name: "Regular User",
        role: "user"
    }
];
const products = [
    {
        productId: "P101",
        productName: "Laptop",
        price: 55000,
        quantity: 5,
        status: "in stock"
    },
    {
        productId: "P102",
        productName: "Wireless Mouse",
        price: 1200,
        quantity: 0,
        status: "out of stock"
    },
    {
        productId: "P103",
        productName: "Keyboard",
        price: 2500,
        quantity: 10,
        status: "in stock"
    }
];


//authenticate user login

server.post("/login", (req, res) => {

    let { email, password } = req.body

    if (!email || !password) {
        return res.json({ message: "Invalid Request" })
    }

    const user = users.find((i) => i.email == email)

    if (user == null) {
        return res.json({ message: "user not found" })
    }

    if (user.password != password) {
        return res.json({ message: "Invalid Password" })
    }
    return res.json({ message: "Login successfull" })

})

//Add Product (Admin Only)

server.post("/add-product", (req, res) => {

    let { email, password, newproductId, newproductName, newprice, newquantity } = req.body

    if (!email || !password || !newproductId || !newproductName || !newprice || !newquantity) {
        return res.json({ message: "invalid request" })
    }

    const userd = users.find((i) => i.email == email)

    if (userd == null) {
        return res.json({ message: "user not found" })
    }

    if (userd.password != password) {
        return res.json({ message: "Invalid Password" })
    }

    if (userd.role != "admin") {
        return res.json({ message: "Only admin can add products" })
    }

    const pro = products.find((i) => i.productId == newproductId || i.productName == newproductName)

    if (pro) {
        return res.json({ message: "product already exists" })
    }

    const newproduct = {
        productId: newproductId,
        productName: newproductName,
        price: newprice,
        quantity: newquantity
    }

    products.push(newproduct)
    return res.json({ message: "New product added", newproduct })
})

//View Products (All Users)

server.get("/products", (req, res) => {

    let { email, password } = req.body

    if (!email || !password) {
        return res.json({ message: "Invalid Request" })
    }

    const user = users.find((i) => i.email == email)

    if (user == null) {
        return res.json({ message: "user not found" })
    }

    if (user.password != password) {
        return res.json({ message: "Invalid Password" })
    }
    return res.json({ products })

})

//update product name,price,quantity

server.patch("/update-product", (req, res) => {

    let { email, password, productId, productName, price, quantity } = req.body

    if (!email || !password || !productId || !productName || !price || !quantity) {
        return res.json({ message: "invalid request" })
    }

    const userdet = users.find((i) => i.email == email)

    if (userdet == null) {
        return res.json({ message: "user not found" })
    }

    if (userdet.password != password) {
        return res.json({ message: "Invalid Password" })
    }

    if (userdet.role != "admin") {
        return res.json({ message: "Only admin can add products" })
    }

    if (userdet.role == "admin") {

        const updatedpro = {

            ...userdet,
            productName: productName,
            price: price,
            quantity: quantity

        }

        const index = products.findIndex((i) => i.productId == productId)

        if (index == -1) {
            return res.json({ message: "product dont exist" })
        }

        products.splice(index, 1)

        products.push(updatedpro)
        return res.json({ message: "product updated succesfully", updatedpro })

    }
})

//delete product

server.delete("/delete-product", (req, res) => {

    let { email, password, productId } = req.body


    if (!email || !password || !productId) {
        return res.json({ message: "Invalid Request" })
    }

    const usera = users.find((i) => i.email == email)

    if (usera == null) {
        return res.json({ message: "user not found" })
    }

    if (usera.password != password) {
        return res.json({ message: "Invalid Password" })
    }

    if (usera.role == "admin") {

        const index = products.find((i) => i.productId == productId)

        if (index == -1) {
            return res.json({ message: "product dont exist" })
        }
        products.splice(index, 1)
        return res.json({ message: "product deleted succesfully" })
    }
    return res.json({ message: "only admin can delete products" })




})