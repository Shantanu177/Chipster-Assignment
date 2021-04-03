const express = require('express')
const axios = require('axios');
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app=express()

app.set("view engine", "ejs");
// app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.get('/',(req,res)=>{

  //  fetch('http://localhost:8000/data.json')
  //  .then(
  //    (response)=>{
  //      console.log(response);
  //    }
  //  )
  //  .catch((error) =>{
  //     console.log(" Axios Error " + error);
  //   })

    axios.get('http://localhost:8000/data.json')
    .then(function (response) {
      res.render('Portfolio',{response : response.data} )
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(" Axios Error " + error);
    })
    // .then(function () {
    //   // always executed
    // });
})

if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err,
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {},
    });
  });

const PORT = 8000 || process.env.PORT;
app.listen(PORT, process.env.IP, console.log("Server Started on PORT 8000"));