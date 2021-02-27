const express = require("express");
const app = express();
const port = process.env.PORT;

require("./db/mongoose");

// app.use((req, res, next) => {
//   if (req.method == "GET") {
//     res.send("Get requests are disabled");
//   } else {
//     next();
//   }
// });

app.use(express.json());
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
app.use(userRouter);
app.use(taskRouter);
const jwt = require("jsonwebtoken");
app.listen(port, () => {
  console.log("This application is up running" + port);
});

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "6762" }, "thisismynewcourse", {expires});
//   console.log(token);
//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// myFunction();
