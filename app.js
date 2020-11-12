require("dotenv").config();
const express = require('express')
const app = express();
// const session = require("express-session");
const userRouter = require("./api/users/user.router");
const barangRouter = require("./api/users/user.router");
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/api/users", userRouter); //endpoint induk dari user router

// app.use(
//     session({
//         secret: "secret",
//         resave: true,
//         saveUninitialized: true
//     })
// );

app.listen(process.env.APP_PORT, () => {
    console.log("running on port " + process.env.APP_PORT);
});

module.exports  = app;
//yg dijalankan adalah router