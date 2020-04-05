import {initSignature} from "./signature.js"

window.onload= app;


function app(){

	var userID;
	let userEl = document.querySelector("#user");


	console.log("App loaded correctly");


	axios.get('api/calculation/1')
	  .then(function (response) {
	    // handle success
	    var payroll = "$"+response.data.quantity* response.data.dayLabored;
		userID=response.data.id;
	    userEl.innerHTML=`Total a pagar a: ${response.data.name} ${payroll}`;

	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  })
	  .then(function () {
	    // always executed
	  });

	  initSignature();

	  let submitBtn = document.querySelector("#submit");

	  submitBtn.addEventListener('click',(e)=>{
	  		axios.post(`api/calculation/saveImage/${userID}`,{signature:canvas.toDataURL()})
		  .then(function (response) {
		    // handle success
		    var link = document.createElement("A");
		    link.href=`api/pdf/${userID}`;
		    submitBtn.appendChild(link);
		    link.click();

		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		  });
	  })




}