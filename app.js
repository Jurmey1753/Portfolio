const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// mail sender details
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "12190096.gcit@rub.edu.bt",
      pass: "unotgwfkwgjpinnq"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
app.get("/", function(req, res){
    res.render("index");
})

app.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    var mailOptions = {
        from: "Users",
        to: "12190096.gcit@rub.edu.bt",
        subject: "Feedback",
        html: "<h2>Hello I'm " + name + ",</h2>" +message
      };
      //sending mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("email" + error);
          res.render("index", {
            errorMessage: error
          });
        } else {
          console.log("Feedback sent");
          res.render("index", {
            successMessage: "Feedback sent successfully"
          });
        }
      });
})

app.listen(3000, function(req, res){
    console.log("server started on port 3000");
});
