const express = require("express");
const apiRouter = express.Router();
const PDFDocument = require("pdfkit");

var signature;
var idSign= new Map();

apiRouter.route("/calculation/:idUser").get(function(req, res) {
  //look on server

  let idUser = req.params.idUser;
  
  var irving = {id:idUser, quantity:400, dayLabored: 2, name:"Irving Soto"};
  
  res.status(200).send(irving);
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

  const content = `   FGG 5 Year 
      Mr ${req.params.idUser}

      With Sign:

  `;

  doc.y = 300;

  doc.text(content, 50, 50);
  let data=idSign.get(req.params.idUser).split(',')[1] ||"" ;
  var buffer = new Buffer(data, "base64");
  doc.image(buffer, 80, 80, {height: 75});

  doc.pipe(res);

  doc.end();

  return;
});




module.exports = apiRouter;
