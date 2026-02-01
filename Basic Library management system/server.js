import express from "express"

const server = express()

server.use(express.json())

server.listen(5000, () => {
  console.log("server active")
})
const users = [
  {
    email: "admin@library.com",
    password: "admin123",
    name: "Library Admin",
    role: "admin"
  },
  {
    email: "user1@library.com",
    password: "user123",
    name: "Alice",
    role: "user"
  },
  {
    email: "user2@library.com",
    password: "user456",
    name: "Bob",
    role: "user"
  }
];

const books = [
  {
    bookId: "B101",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "available"
  },
  {
    bookId: "B102",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    status: "borrowed"
  },
  {
    bookId: "B103",
    title: "Introduction to Algorithms",
    author: "CLRS",
    status: "available"
  }
];

const borrowRecords = [
  {
    email: "user1@library.com",
    bookId: "B102",
    borrowDate: "2026-01-12"
  }
];

//Admin adds a new book to the library.

server.post("/add-books", (req, res) => {

  let { email, password, newbookID, newtitle, newauthor, newstatus } = req.body

  if (!email || !password || !newbookID || !newtitle || !newauthor || !newstatus) {
    return res.json({ success: false, message: "Invalid Request" })
  }

  const login = users.find((u) => u.email == email)

  if (login == null) {
    return res.json({ success: false, message: "User not found" })
  }

  if (login.password != password) {
    return res.json({ success: false, message: "Invalid Password" })
  }

  if (login.role != "admin") {
    return res.json({ success: false, message: "Only admin can add books" })
  }

  if (login.role == "admin") {

    const nbook = books.find((n) => n.bookId == newbookID)

    if (nbook == null) {

      const newbook = {
        newbookID: Math.floor(Math.random() * 10),
        newtitle: newtitle,
        newauthor: newauthor,
        status: newstatus
      }

      books.push(newbook)
      return res.json({ success: true, message: "New book added successfully" })

    }
    return res.json({ success: false, message: "Book already exists" })


  }
})

//Returns the list of all books(anyone can access)

server.get("/books",(req,res)=>{

  let{email,password}=req.body

  if(!email||!password){
    return res.json({message:"Invalid Request"})
  }

  const userdetails=users.find((ele)=>ele.email==email)

  if(userdetails==null){
    return res.json({message:"user not found"})
  }
  if(userdetails.password!=password){
    return res.json({message:"Invalid Password"})
  }
 return res.json({books})
})

// Allow a library user to borrow a book

server.post("/borrow-book", (req, res) => {

  let { email, password, bookId } = req.body

  if (!email || !password || !bookId) {
    return res.json({ success: false, message: "Invalid Request" })
  }

  const userd = users.find((i) => i.email == email)

  if (userd == null) {
    return res.json({ success: false, message: "User not found" })
  }

  if (userd.password != password) {
    return res.json({ success: false, message: "Invalid Password" })
  }

  if (userd.role != "user") {
    return res.json({ success: false, message: "Only users can borrow books" })
  }

  const bookfound = books.find((i) => i.bookId == bookId && i.status == "available")

  if (bookfound == null) {
    return res.json({ message: "Book not found or already borrowed" })
  }

  const borrows = borrowRecords.find((b) => b.bookId == bookId && b.email == email)

  if (borrows == null) {

    var date = new Date().now()

    const newbookrec = {
      email: email,
      bookId: bookId,
      borrowDate: date
    }

    borrowRecords.push(newbookrec)
    books.status = "borrowed"
    return res.json({ success: true, message: "Book can be borrowed" })

  }

  return res.json({ success: false, message: "User cant borrow the book twice" })

})

//Allows a user to return a borrowed book

server.post("/return-book",(req,res)=>{

  let{email,password,bookId}=req.body

  if(!email||!password||!bookId){
    return res.json({message:"Invalid Request"})
  }

  const userdet=users.find((ele)=>ele.email==email)

  if(userdet==null){
    return res.json({message:"No user found"})
  }
  
  if(userdet.password!=password){
    return res.json({message:"Invalid Password"})
  }
  if(userdet.role!="user"){
    return res.json({message:"only users can return books"})
  }

  const index=borrowRecords.findIndex((i)=>i.email==email && i.bookId==bookId)


  if(index==-1){
    return res.json({message:"no borrows"})
  }

  //updating book status

  const booksd=books.find((i=>i.bookId==bookId))

  if(booksd){
    
  booksd.status="available"

  }


  borrowRecords.splice(index,1) //deletes borrowrec

  return res.json({message: "Book returned successfully"});


})




