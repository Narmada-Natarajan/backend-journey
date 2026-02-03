import express from "express";

import cors from "cors";

const server = express();

server.use(express.json());

server.use(cors());

server.listen(5000, () => console.log("server is running in 5000 port"));

server.post("/register", (req, res) => {
  console.log("New Request");
  let { fullname, email, password } = req.body;
  console.log(fullname, email, password);
  res.json({
    status: false,
    message: "Got the cred",
  });
});
