// selectGame function
const slides=document.querySelector(".slides");
const checkGame=document.querySelectorAll(".check-menu > li");
const slideGame=document.querySelectorAll(".slides > li");
const prevButton=document.querySelector(".prev");
const nextButton=document.querySelector(".next");
const gameTetris=document.querySelector("#tetris");
const game2048=document.querySelector("#two-zero-four-eight");
const gameJump=document.querySelector("#jump");

currentIdx=0;
checkGameCount=checkGame.length;
slideCount=slideGame.length;
slideWidth=506;
slideMargin=100;

makeClone();
init();

function makeClone(){
    let cloneSlideFirst=slideGame[0].cloneNode(true);
    let cloneSlideLast=slides.lastElementChild.cloneNode(true);
    slides.append(cloneSlideFirst);
    slides.insertBefore(cloneSlideLast,slides.firstElementChild);
}
function init(){
    slides.style.width=(slideWidth+slideMargin)*(slideCount+2)+"px";
    slides.style.left=-(slideWidth+slideMargin)+"px";
    checkGame[0].style.backgroundColor="white";
}
function nextButtonClick(){
    if(currentIdx<=slideCount-1){
        slides.style.left=-(currentIdx+2)*(slideWidth+slideMargin)+"px";
        slides.style.transition=`${0.5}s ease-out`;
        checkGame[currentIdx].style.backgroundColor="black";
        if(currentIdx<2)
            checkGame[currentIdx+1].style.backgroundColor="white";
        else
            checkGame[currentIdx].style.backgroundColor="black";
    }
    if(currentIdx===slideCount-1){
        checkGame[0].style.backgroundColor="white";
        setTimeout(function(){
            slides.style.left=-(slideWidth+slideMargin)+"px";
            slides.style.transition=`${0}s ease-out`;
        },500);
        currentIdx=-1;
    }
    currentIdx+=1;
}
function prevButtonClick(){
    if(currentIdx>=0){
        slides.style.left=-currentIdx*(slideWidth+slideMargin)+"px";
        slides.style.transition=`${0.5}s ease-out`;
        checkGame[currentIdx].style.backgroundColor="black";
        if(currentIdx>=1)
            checkGame[currentIdx-1].style.backgroundColor="white";
        else
            checkGame[currentIdx].style.backgroundColor="black";
    }
    if(currentIdx===0){
        checkGame[2].style.backgroundColor="white";
        setTimeout(function(){
            slides.style.left=-slideCount*(slideWidth+slideMargin)+"px";
            slides.style.transition=`${0}s ease-out`;
        },500);
        currentIdx=slideCount;
    }
    currentIdx-=1;
}

//onclick function
nextButton.onclick=function(){
    nextButtonClick();
}
prevButton.onclick=function(){
    prevButtonClick();
}
gameTetris.onclick=function(){
    window.location.href="tetris.html";
}
game2048.onclick=function(){
    window.location.href="2048.html";
}
gameJump.onclick=function(){
    window.location.href="jump.html";
}

//keydown function
document.addEventListener("keydown",e=>{ 
    switch(e.keyCode){ 
        case 39: //오른쪽 방향키
            nextButtonClick();
            break;
        case 37: //왼쪽 방향키
            prevButtonClick();
            break;
        default: 
            break;
    }
})