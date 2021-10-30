const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;



const particlesArray = [];


class particle{
  constructor(){
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;
    this.w = 1;
    this.h = this.w;
    this.speed = Math.random() * 10 + 1;
  }
  draw(){
    ctx.fillStyle = "rgba(255, 0, 0, 1)"
    ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
  }
  update(){
    this.x += (Math.random()*2 - 1) * this.speed;
    this.y += (Math.random()*2 - 1) * this.speed;

  }
}

function pushParticle(n){
  for(var i = 0; i < n; i++){
    particlesArray.push(new particle);
  }
  
}

function animate(){
  ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for(var i = 0; i < particlesArray.length; i++){
    particlesArray[i].draw();
    particlesArray[i].update();
  }
  pushParticle(1);

  window.requestAnimationFrame(animate);
}

animate();

//record
var videoStream = canvas.captureStream(60); 
// the parameter is the desired framerate, see the MDN doc for more info
var mediaRecorder = new MediaRecorder(videoStream);
var chunks = [];

mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.onstop = function(e) {
  var blob = new Blob(chunks, { 'type' : 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info
   chunks = [];
   var videoURL = URL.createObjectURL(blob);
  
   const a = document.createElement("a");
                a.href = videoURL;
                a.download = "recording.mp4";
                a.click();
                URL.revokeObjectURL(videoURL);
 };

 mediaRecorder.start();
 setTimeout(function (){ mediaRecorder.stop(); }, 50000);

 let image = "";
 setTimeout(function (){
     image = canvas.toDataURL('image/png'); 
     console.log(image);
}, 5000);
