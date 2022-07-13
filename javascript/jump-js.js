var canvas=document.getElementById('canvas');
var canvas2=document.getElementById("canvas2");
var ctx=canvas.getContext('2d');
var ctx2=canvas2.getContext("2d");

canvas.width=window.innerWidth-200;
canvas.height=window.innerHeight-200;
canvas2.width=200;
canvas2.height=200;

const content=document.querySelector(".content");
const startText=document.querySelector(".start-text");
const startButton=document.querySelector(".start-text > button");
const gameText=document.querySelector(".game-text");
const gameButton=document.querySelector(".game-text > button");
const scoreDisplay=document.querySelector(".score");
const endingScore=document.querySelector(".ending-score");

var timer=0;
var score=0;

var characterMotionTime=1;

var respawnObjectTime=100;
var objectType=1;
var objectArr=[];
var objectMoveSpeed=12;
var reMax=25;
var reMin=9;

var jump=false;
var jumpTimer=0;
var jumpHieght=15;
var jumpFrame=1;
var jumpSpeed=14;

var animation;

var characterImg=new Image();
var characterImg1=new Image();
var characterImg2=new Image();
var characterImg3=new Image();
var characterImg4=new Image();
var characterImg5=new Image();
var characterImg6=new Image();
var characterImg7=new Image();
var characterImg8=new Image();
var characterImg9=new Image();
var characterImg10=new Image();
var characterImg11=new Image();
var characterImg12=new Image();
var characterEndImg=new Image();
characterImg1.src="../image/character-walking-img/character-walking-img-1.png";
characterImg2.src="../image/character-walking-img/character-walking-img-2.png";
characterImg3.src="../image/character-walking-img/character-walking-img-3.png";
characterImg4.src="../image/character-walking-img/character-walking-img-4.png";
characterImg5.src="../image/character-walking-img/character-walking-img-5.png";
characterImg6.src="../image/character-walking-img/character-walking-img-6.png";
characterImg7.src="../image/character-walking-img/character-walking-img-7.png";
characterImg8.src="../image/character-walking-img/character-walking-img-8.png";
characterImg9.src="../image/character-walking-img/character-walking-img-9.png";
characterImg10.src="../image/character-walking-img/character-walking-img-10.png";
characterImg11.src="../image/character-walking-img/character-walking-img-11.png";
characterImg12.src="../image/character-walking-img/character-walking-img-12.png";
characterEndImg.src="../image/character-end-img.png";
var ctxImg=[characterImg1,
            characterImg2,
            characterImg3,
            characterImg4,
            characterImg5,
            characterImg6,
            characterImg7,
            characterImg8,
            characterImg9,
            characterImg10,
            characterImg11,
            characterImg12
            ];
var characterImgArr=[];
var characterImgIndex=0;
var character={
    x:40,
    y:410,
    width:100,
    height:150,
    draw(){
        if(jump==false){
            switch(characterMotionTime){
                case 1:
                    ctx.drawImage(characterImg1,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 2:
                    ctx.drawImage(characterImg2,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 3:
                    ctx.drawImage(characterImg3,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 4:
                    ctx.drawImage(characterImg4,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 5:
                    ctx.drawImage(characterImg5,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 6:
                    ctx.drawImage(characterImg6,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 7:
                    ctx.drawImage(characterImg7,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 8:
                    ctx.drawImage(characterImg8,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 9:
                    ctx.drawImage(characterImg9,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 10:
                    ctx.drawImage(characterImg10,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;
                case 11:
                    ctx.drawImage(characterImg11,this.x,this.y,this.width,this.height);
                    characterMotionTime=1;
                    break;  
                case 12:
                    ctx.drawImage(characterImg12,this.x,this.y,this.width,this.height);
                    characterMotionTime++;
                    break;  
                default:
                    break;
            }
        }
        else{
            ctx.drawImage(characterImg1,this.x,this.y,this.width,this.height);
        }
    }
}
var selectObjectImg=1;
var LowObjectImg=new Image();
LowObjectImg.src="../image/object-low-img.png";
class LowObject{
    constructor(){
        this.x=1800;
        this.y=480;
        this.width=80;
        this.height=80;
    }
    draw(){
        ctx.drawImage(LowObjectImg,this.x,this.y,this.width,this.height);
    }
}
var HighObjectImg=new Image();
HighObjectImg.src="../image/object-high-img.png";
class HighObject{
    constructor(){
        this.x=1800;
        this.y=310;
        this.width=150;
        this.height=150;
    }
    draw(){
        ctx.drawImage(HighObjectImg,this.x,this.y,this.width,this.height);
    }
}

window.onload=function(){
    scoreDisplay.style.visibility="hidden";
    startText.style.display="flex";
}
startButton.onclick=function(){
    startText.style.display="none";
    scoreDisplay.style.visibility="visible";
    runFrame();
}

function runFrame(){
    animation=requestAnimationFrame(runFrame);
    timer++;
    if(timer%60==0)
        score++
    scoreDisplay.innerText=score+" second";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    backgroundImgChange();
    character.draw();
    characterJump();
    spawnObject();    
}
function characterJump(){
    if(jump==true){
        character.y-=jumpSpeed;
        jumpTimer+=jumpFrame;
    }
    else{
        if(character.y<410){
            character.y+=jumpSpeed;
        }
    }
    if(jumpTimer>jumpHieght){
        jump=false;
        jumpTimer=0;
    }
}

function backgroundImgChange(){
    canvas.style.backgroundImage="url(../image/jump-bgimage-play.gif)";
}

function spawnObject(){
    if(timer%respawnObjectTime===0){
        if(objectType==1){
            var object=new LowObject();
            objectArr.push(object);;
        }else{
            var object=new HighObject();
            objectArr.push(object);;
        }
    }
    objectArr.forEach((a,i,o)=>{
        if((a.x+a.width)<character.x){
			o.splice(i,1);
            respawnObjectTime=(Math.floor(Math.random()*(reMax-reMin)+reMin))*10;
            objectType=Math.floor(Math.random()*2);
        }
        a.x-=objectMoveSpeed;
        crashCheck(character,a);
        a.draw();
    })
}
//충돌확인
function crashCheck(character,object){
    var xDifference=object.x-(character.x+character.width);
    var yDifference=object.y-(character.y+character.height);
    if((object.y+object.height)==560){
        if(xDifference<0&&yDifference<0){
            if(!character.x<object.x){
                canvas.style.backgroundImage="url(../image/jump-bgimage-end.png)";
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(characterEndImg,character.x,character.y+60,character.width,character.height-60);
                cancelAnimationFrame(animation);
                showGameoverText();
            }
        }
    }else{
        if(xDifference<=0){
            if(((character.y)-(object.y+object.height))<0){
                if(!character.x<object.x){
                    canvas.style.backgroundImage="url(../image/jump-bgimage-end.png)";
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.drawImage(characterEndImg,character.x,character.y+60,character.width,character.height-60);
                    cancelAnimationFrame(animation);
                    showGameoverText();
                }
            }
        }
    }
}
function showGameoverText(){
    scoreDisplay.style.visibility="hidden";
    endingScore.innerHTML=score+" second";
    gameText.style.display="flex";
}

document.addEventListener("keydown",e=>{
    switch(e.keyCode){
		case 32:
			if(character.y+character.height==560)    
                jump=true;
			break;
        case 40:
            if(character.y==410)
                character.y+=60;
			break;
		default:
			break;
    }
});
document.addEventListener("keyup",e=>{
    switch(e.keyCode){
        case 40:  
            if(character.y!=410)
                character.y=410;
			break;
		default:
			break;
    }
});

//guide function
const guideIcon=document.querySelector(".guide-div > div");
const guide=document.querySelector(".guide-div > ul > div");

guideIcon.onclick=function(){
    if(!guide.classList.contains("guideOff"))
        guide.classList.add("guideOff");
    else
        guide.classList.remove("guideOff");
}

//redirect function
const homeButton=document.querySelector(".home");
const prevButton=document.querySelector(".prev");
const nextButton=document.querySelector(".next");

homeButton.onclick=function(){
    window.location.href="../html/index.html";
}
prevButton.onclick=function(){
    window.location.href="../html/2048.html";
}
nextButton.onclick=function(){
    window.location.href="../html/tetris.html";
}