import Books from "../models/books.models.js"
import Students from "../models/students.models.js"
import transactions from "../models/transaction.models.js"

//add new book

export const newBook = async (req, res) => {

    let { id, bname, author, reg } = req.body

    if (!id || !bname || !author || !reg) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })
    }

    //else

    try {
        const b = await Books.exists({ bookid: id }) //if book already exists

        if (b != null) {
            return res.status(400).json({
                status: false,
                message: "Book already exists"
            })

        }
        await Books.create({ bookid: id, bookname: bname, author: author, reg: reg })
        return res.status(400).json({
            status: true,
            message: "Book added successfully"
        })

    }

    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        })
    }

}

//borrow the book

export const borrowBook = async (req, res) => {

    let { reg, bid } = req.body  //student req

    if (!reg || !bid) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })
    }

    try {

        const s = await Students.exists({ regno: reg, status: false }) //if  student exists and status is false means he didnt borrowed any book  yet
        const boo = await Books.exists({ bookid: bid, status: "available" }) //check if the book is available to borrow


        if (s != null && boo != null) {
            await Students.updateOne({ regno: reg }, { $set: { status: true } }) //if exists change student status to true and 
            await Books.updateOne({ bookid: bid }, { $set: { status: "borrowed" } })  //book status to borrowed
            await transactions.create({ lendedto: reg, bookid: bid })

            return res.json({ status: true, message: "Student borrowed the book" })

        }
        return res.status(200).json({
            status: false,
            message: "Book not available or you already borrowed another book"
        })
    }

    catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong" })
    }

}


//return the book

export const returnBook = async (req, res) => {

    let { reg, bookno } = req.body

    if (!reg || !bookno) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })
    }

    try {
        const txn = await transactions.exists({ lendedto: reg, bookid: bookno }) //check if student borrowed the book and bookid 

        if (txn == null) {
            return res.status(400).json({ status: false, message: "Book not borrowed by this student" })
        }

        await Books.updateOne({ bookid: bookno }, { $set: { status: "available" } })
        await Students.updateOne({ regno: reg }, { $set: { status: false } })
        await transactions.deleteOne({ lendedto: reg, bookid: bookno })

        return res.status(200).json({
            status: true,
            message: "Book returned successfully"
        })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Something went wrong" })
    }
}



//view transaction history

export const transactionHistory = async (req, res) => {

    let { reg } = req.body

    if (!reg) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    try {
        const txn = await transactions.find({ lendedto: reg })

        if (txn.length == 0) {
            return res.json({
                status: false,
                message: "Transactions not found"
            })
        }
        return res.json({ status: true, txn })
    }
    catch (error) {
        console.log(error)
        return res.json({ status: false, message: "Something went wrong" })

    }

}



