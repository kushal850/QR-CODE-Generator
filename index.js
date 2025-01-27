import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";
import express from "express";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.render("index.ejs");        
});

// Generating QR code
app.post("/submit",(req,res) => {
console.log(req.body);
const answers = req.body.street;
const url = answers;
var qr_svg = qr.image(url);
qr_svg.pipe(fs.createWriteStream("public/qr_img.png"));
res.render("index.ejs",{
  cond : answers,
});
 fs.writeFile("URL.txt", url, (err) => {
 if (err) throw err;
  console.log("The file has been saved!");
});
});

// downloding QR
app.post("/download",(req,res) => {
  res.download("public/qr_img.png");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
