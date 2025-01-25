import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
 app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("public/qr_img.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  


  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/



// var image = document.createElement("img");
// image.src = "qr_img.png";
// document.body.appendChild(image);
// app.use("/",route);
// app.use(express.static("views"));
app.get("/", (req, res) => {
 
  res.render("index.ejs");

// var pic = fs.createReadStream("qr_img.png");
// var comments = "bla bla bla";
// res.render('index.ejs', {pic: pic , comments: comments } );
    
  
    // let filePath = path.join(__dirname, "qr_img.png");

         
});





// app.post("/submit", (req, res) => {
//   const streamReadFile = fs.createReadStream("qr_img.png");
//   streamReadFile.pipe(res);
// });


//-----------------------------------------------------------------------------



// .then((answers) => {
//   const url = answers.URL;
//   var qr_svg = qr.image(url);
//   qr_svg.pipe(fs.createWriteStream("qr_img.png"));

//   fs.writeFile("URL.txt", url, (err) => {
//     if (err) throw err;
//     console.log("The file has been saved!");
//   });


// const imageURL = img.src;
// const imgHTML = " + '<img src=" ' + imageURL + ' " style="max-width:100%
// ;max-height:100%" />'
// response.render(' ./index', { title: 'Express.js', view: imgHTML });
// imageURL
// is the path to the image and
// imgHTML
// contains the HTML code for the image tag.




//-----------------------------------------------------------------------------




app.post("/submit",(req,res) => {
console.log(req.body);
const answers = req.body.street;
const url = answers;
var qr_svg = qr.image(url);
qr_svg.pipe(fs.createWriteStream("public/qr_img.png"));
res.render("index.ejs",{
  cond : answers,
});
// res.download("qr_img.png");





 fs.writeFile("URL.txt", url, (err) => {
 if (err) throw err;
  console.log("The file has been saved!");
//   // console.log("Name: ", req.body.street);
//   if(req.body.street == "hey"){
//     res.download("qr_img.png");
//   } else {
//     res.send("wrong");
//   }
});
});

app.post("/download",(req,res) => {
  res.download("public/qr_img.png");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
