window.onload= app;


function $(query) { return document.querySelector(query);}
function $$(query) { return document.querySelectorAll(query);}

var canvas;
var ctx;
var drawing;
var mousePos;
var lastPos;
var clearCanvas;

function app(){
	canvas = $("#canvas");
	ctx = canvas.getContext("2d");

  	drawing = false;
	mousePos = { x:0, y:0 };
	lastPos= mousePos;
	clearEl= $("#clear");

	clearEl.addEventListener("click", (e)=>{
		clearCanvas();
	})

	window.requestAnimFrame = (function (callback) {
	        return window.requestAnimationFrame || 
	           window.webkitRequestAnimationFrame ||
	           window.mozRequestAnimationFrame ||
	           window.oRequestAnimationFrame ||
	           window.msRequestAnimaitonFrame ||
	           function (callback) {
	        window.setTimeout(callback, 1000/60);
	           };
	})();

	function renderCanvas(){
		if(drawing){
			ctx.moveTo(lastPos.x,lastPos.y );
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			lastPos=mousePos;
		}
	}


	(function drawLoop () {
	  requestAnimFrame(drawLoop);
	  renderCanvas();
	})();

	canvas.addEventListener("mousedown", (e)=>{
		drawing=true;
		 lastPos = getMousePos(canvas, e);
	},false);

	canvas.addEventListener("mouseup", (e)=>{
		drawing=false;
	},false);

	canvas.addEventListener("mousemove", (e)=>{
		mousePos = getMousePos(canvas, e);
	},false);


	canvas.addEventListener("touchstart", function (e) {
	        mousePos = getTouchPos(canvas, e);
	  var touch = e.touches[0];
	  var mouseEvent = new MouseEvent("mousedown", {
	    clientX: touch.clientX,
	    clientY: touch.clientY
	  });
	  canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
	  var mouseEvent = new MouseEvent("mouseup", {});
	  canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
	  var touch = e.touches[0];
	  var mouseEvent = new MouseEvent("mousemove", {
	    clientX: touch.clientX,
	    clientY: touch.clientY
	  });
	  canvas.dispatchEvent(mouseEvent);
	}, false);

	function getMousePos (canvasDom, mouseEvent){
	  var rect = canvasDom.getBoundingClientRect();
	  return {
	    x: mouseEvent.clientX - rect.left,
	    y: mouseEvent.clientY - rect.top
	  };
	}

		function getTouchPos(canvasDom, touchEvent) {
		  var rect = canvasDom.getBoundingClientRect();
		  return {
		    x: touchEvent.touches[0].clientX - rect.left,
		    y: touchEvent.touches[0].clientY - rect.top
		  };
		}

	function clearCanvas(){
		 canvas.width = canvas.width;
		 console.log("Clearing canvas");

	}
}
