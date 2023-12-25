"use strict";
let H, W, san, {PI, hypot, random, sin, cos, atan2} = Math, boids = [];
let background,grd,grd2,tree,snm,house,gift,cntc,rndr,cloud,stars=[],clouds=[],snow=[];

const Grad=(x,y,r)=>{
    grd=san.createRadialGradient(x,y,0,x,y,r,0);
    grd.addColorStop(.7, "#FEFCD7");
    grd.addColorStop(1, "transparent");
}

class Cloud {
    constructor(){
        this.x=random()*W;
        this.y=random()*200;
        this.v=random()*.5+.5;
        this.r=random()*100+70;
    }
    draw(){
        this.x+=this.v;
        if(this.x>W+170) this.x=-170;
        san.beginPath()
        san.drawImage(cloud,this.x,this.y,this.r,this.r);
        san.closePath()
    }
}

class Snow {
    constructor(){
        this.x=random()*W;
        this.y=random()*H;
        this.v={x:random()*.4-.2,y:random()*.5+.25};
        this.r=random()*5+3;
        this.vs=0;
    }
    draw(){
        
        this.y+=this.v.y
        this.x+=this.v.x+this.vs;
        this.v.x+=random()*.02-.01
        if(this.y>H+10) this.y=-10;
        if(this.x>W+10) this.x=-10;
        if(this.x<0) this.x=W+10;
        san.fillStyle="white";
        san.beginPath()
        san.arc(this.x,this.y,this.r,0,PI*2);
        san.fill();
        san.closePath()
        this.vs=0;
    }
}

class Star {
    constructor(){
        this.x=random()*W;
        this.y=random()*(H*.8);
        this.r=random()*1+1;
    }
    draw(){
        san.beginPath();
        san.fillStyle="rgba(300,300,300,.7)";
        san.arc(this.x,this.y,this.r,0,PI*2)
        san.fill();
        san.closePath();
    }
}

class Background {
    constructor(){
        this.tx=0;
        this.ta=0;
    }
    draw(){
        this.ta+=.1;
        this.tx=sin(this.ta)*10;
        
        san.beginPath();
        san.fillStyle=grd;
        san.arc(W-150,150,100,0,PI*2)
        san.fill();
        san.closePath();
    
        san.beginPath();
        san.fillStyle="#f3f3f3"
        san.moveTo(0,H-H/4);
        san.quadraticCurveTo(W/2,H-H/4,W,H-H/5.5);
        san.lineTo(W,H);
        san.lineTo(0,H);
        san.fill();
        san.closePath();
    
        san.drawImage(tree,-W/18,(H-H/2.5)+this.tx,300,300-this.tx)
        san.drawImage(gift,W/8,(H-H/4.6),50,50)
        san.drawImage(house,W/3,(H-H/3.3),150,150)
        
        
        
        san.beginPath();
        san.fillStyle="white"    
        san.moveTo(W,H-H/5);
        san.quadraticCurveTo(W/2,H-H/5,0,H-H/6.5);
        san.lineTo(0,H);
        san.lineTo(W,H);
        san.fill();
        san.closePath();
        san.drawImage(snm,W/2.5,H-170-this.tx/3,130,130+this.tx/3)
        san.drawImage(snm,W/3,H-230+this.tx/3,100,100-this.tx/3)
        san.drawImage(snm,W/2,H-250-this.tx/3,80,80+this.tx/3)
        san.drawImage(house,W-300,H-340,350,350)
        san.drawImage(cntc,W/25,(H-H/7)+this.tx/4,100,100-this.tx/4)
        san.drawImage(rndr,W/25+90,(H-H/7)-this.tx/4,100,100+this.tx/4)
    }
    
}

const Loop=()=>{  
    san.fillStyle="rgba(0,0,0,.1)"; 
    san.clearRect(0,0,W,H);
    background.draw();
    stars.forEach(v=>v.draw());    
    clouds.forEach(v=>v.draw())
    snow.forEach(v=>v.draw())
    webkitRequestAnimationFrame(Loop);
}

// canvas setup 
const init=()=>{
    document.body.style.margin=0;
    let c=document.getElementById("c");
    document.body.appendChild(c);
    c.style.position="fixed"
    c.style.background=0?"#002040":"black";
    c.style.zIndex=0;
    c.style.left=0;c.style.top=0;
    c.style.width="100vw",c.style.height="100vh";
    H=c.height=innerHeight*2,W=c.width=innerWidth*2;
    san=c.getContext('2d');  
    tree=document.createElement("img");
    tree.src= "https://www.dropbox.com/s/v8mywsigvp7swyh/2299172.png?dl=0&raw=1";
    snm=document.createElement("img");
    snm.src= "https://www.dropbox.com/s/udkm56vfsbkod0x/2300217.png?dl=0&raw=1";
    house=document.createElement("img");
    house.src= "https://www.dropbox.com/s/2s0nqji30k8oaqy/275688.png?dl=0&raw=1";
    gift=document.createElement("img");
    gift.src= "https://www.dropbox.com/s/j5g1hb4f26v8n5p/2743307.png?dl=0&raw=1";
    cntc=document.createElement("img");
    cntc.src= "https://www.dropbox.com/s/gcm518hj8mlk729/2445129.png?dl=0&raw=1";
    rndr=document.createElement("img");
    rndr.src= "https://www.dropbox.com/s/atmbdibkwxmpve4/1366811.png?dl=0&raw=1";    
    cloud=document.createElement("img");
    cloud.src= "https://www.dropbox.com/s/utt6d8s7bheaf4b/3208676.png?dl=0&raw=1";
    
    Grad(W-150,150,100);
    background=new Background();
    for(let i=0;i<100;i++) stars.push(new Star())
    for(let i=0;i<5;i++) stars.push(new Cloud())
    for(let i=0;i<100;i++) stars.push(new Snow())
    cloud.onload=()=>{
        Loop();
        document.body.onclick=()=>{
if(!playing){
var playPromise = audio.play();
if (playPromise !== undefined) {
  playPromise.then(function() {
  }).catch(function(error) { });}
}
if(start)$('tp').innerHTML='Audio data loading...<br>Please wait';start=false;
}
        document.getElementById("tp").innerHTML="Tap to Play";
        
    }   
};
onload=init;