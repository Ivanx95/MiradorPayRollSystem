const express = require("express");
const apiRouter = express.Router();
const PDFDocument = require("pdfkit");
const sequelize = require("./DB/database");

var cors = require('cors')

var signature;
var idSign= new Map();


apiRouter.use(cors());

apiRouter.route("/users").get(function(req, res) {

  sequelize.models.User.findAll()
    .then((users)=>{
      console.log(users);
        res.status(200).send(users);
    })
  
});

apiRouter.route("/calculation/:idUser").get(function(req, res) {
  //look on server

  let idUser = req.params.idUser;
  
    sequelize.models.User.findAll({where: {id:1}})
    .then((user)=>{
        user.quantity=400;
        user.dayLabored=2;
        res.status(200).send(user);
    })
      
  
 
});


apiRouter.route("/calculation/saveImage/:idUser").post(function(req, res) {
  //look on server
	  
 let token = req.body.signature;
 idSign.set(req.params.idUser, token);

  res.status(200).send("OK");
});




apiRouter.get("/pdf/:idUser", (req, res) => {
  const doc = new PDFDocument();
  let fileName = "Test";
  fileName = encodeURIComponent(fileName) + ".pdf";

  res.setHeader("Content-disposition", "inline");
  res.setHeader("Content-type", "application/pdf");

   sequelize.models.User.findAll({
            where: {id:1},
            attributes: ['name']
            })
    .then((user)=>{
       

     const content = `  CD.  ${user.name} With Sign: `;

      doc.y = 300;

      doc.text(content, 50, 50);
      let data=idSign.get(req.params.idUser).split(',')[1] ||"" ;
      var buffer = new Buffer(data, "base64");
      doc.image(buffer, 80, 80, {height: 75});

      doc.pipe(res);

      doc.end();

      return;
    })


  
});




module.exports = apiRouter;
