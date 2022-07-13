//테트로미노
const BLOCKS={
    T:[
        [[2,1],[1,1],[1,0],[0,1]],
        [[1,2],[1,1],[2,1],[1,0]],
        [[1,2],[1,1],[0,1],[2,1]],
        [[0,1],[1,1],[1,0],[1,2]],
    ],
    O:[
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]]
    ],
    Z:[
        [[0,0],[1,0],[1,1],[2,1]],
        [[0,2],[0,1],[1,1],[1,0]],
        [[0,1],[1,1],[1,2],[2,2]],
        [[0,1],[1,0],[0,2],[1,1]],
    ],
    S:[
        [[2,0],[1,0],[0,1],[1,1]],
        [[1,0],[1,1],[2,1],[2,2]],
        [[2,1],[1,1],[1,2],[0,2]],
        [[1,0],[1,1],[2,1],[2,2]],
    ],
    I:[
        [[0,0],[1,0],[2,0],[3,0]],
        [[2,0],[2,1],[2,2],[2,3]],
        [[0,0],[1,0],[2,0],[3,0]],
        [[1,0],[1,1],[1,2],[1,3]],
    ],
    J:[
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[2,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,1],[2,2]],
        [[1,0],[1,1],[1,2],[0,2]],
    ],
    L:[
        [[2,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[2,2]],
        [[0,1],[1,1],[2,1],[0,2]],
        [[0,0],[1,0],[1,1],[1,2]],
    ]
}


// DOM
const playground = document.querySelector(".playground > ul");
const gameText=document.querySelector(".game-text");
const restartButton=document.querySelector(".game-text > button");
const startText=document.querySelector(".start-text");
const startButton=document.querySelector(".start-text > button");
const scoreDisplay=document.querySelector(".score");
const endingScore=document.querySelector(".ending-score");

//Setting
const GAME_ROWS=20;
const GAME_COLS=10;

//variabales
let score=0; //점수
let duration=500; //블럭이 떨어지는 시간
let downInterval; 
let tempMovingItem; //실행하기전 잠시 담아두는 시간


const movingItem={ //다음 블럭의 좌표와 타입을 담아두는 변수
    type:"", //블럭타입
    direction:0, //회전
    top:0, //생성된 블럭의 좌측상단 기준
    left:3 //생성된 블럭의 좌측상단 기준
};

window.onload=function(){
    for(let i=0; i<GAME_ROWS; i++){ //틀의 세로길이만큼 prependNewLine()을 실행시킨다.
        prependNewLine()
    }
    scoreDisplay.style.visibility="hidden";
    startText.style.display="flex";
}

startButton.onclick=function(){
    init() //funtion init을 실행시킨다.
           //tempMovingItem에 movingItem값을 넣어 준 후 테트리스 틀을 생성해준 뒤 블럭을 하나 생성한다
    startText.style.display="none";
    scoreDisplay.style.visibility="visible";
}


//functions
function init(){
    tempMovingItem={...movingItem}; //{...}스프레드오퍼레이터 사용(이 안에 값만 가져온다.)
    generateNewBlock()
}

function prependNewLine(){ //html에 ul과 li를 넣어 기본적인 틀을 만드는 메소드
    const li=document.createElement("li"); //.playground > ul > li
    const ul=document.createElement("ul"); //.playground > ul > li > ul
    for(let j=0; j<GAME_COLS; j++){
        const matrix=document.createElement("li"); //.playground > ul > li > ul > li
        ul.prepend(matrix); //const matrix를 const ul 내부로 이동
    }
    li.prepend(ul); //const li를 const ul 내부로 이동
    playground.prepend(li); //const li를 playground 내부로 이동
}

function renderBlocks(moveType=""){ //블럭을 나타나게 하는 메소드
    const {type,direction,top,left}=tempMovingItem; //디스트럭션을 이용해 값 하나씩 접근하는 것이 아닌 한번에 접근한다.
    const movingBlocks=document.querySelectorAll(".moving"); //moving클래스를 const movingBlocks에 저장
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type,"moving");
    })
    BLOCKS[type][direction].some(block=>{
        const x=block[0]+left;
        const y=block[1]+top;
        const target=playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable=checkEmpty(target);
        if(isAvailable){
            target.classList.add(type,"moving");
        } 
        else{
            tempMovingItem={...movingItem}
            if(moveType==="retry"){
                clearInterval(downInterval);
                showGameoverText();
            }
            setTimeout(()=>{
                renderBlocks("retry");
                if(moveType==="top"){
                    seizeBlock();
                }
            },0)
            return true;
        }
    })
    movingItem.left=left;
    movingItem.top=top;
    movingItem.direction=direction;
}
function seizeBlock(){
    const movingBlocks=document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=>{
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
}
function checkMatch(){
    const childNodes=playground.childNodes;
    childNodes.forEach(child=>{
        let matched=true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                matched=false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine();
            score++;
            scoreDisplay.innerText=score+" Line";
        }
    })
    generateNewBlock()
}
function generateNewBlock(){
    clearInterval(downInterval);
    downInterval=setInterval(()=>{
        moveBlock('top',1);
    },duration);
    const blockArray=Object.entries(BLOCKS);
    const randomIndex=Math.floor(Math.random()*blockArray.length);
    movingItem.type=blockArray[randomIndex][0];
    movingItem.top=0;
    movingItem.left=3;
    movingItem.direction=0;
    tempMovingItem={...movingItem};
    renderBlocks();
}
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}
function moveBlock(moveType,amount){ //블럭을 이동시키는 메소드
    tempMovingItem[moveType]+=amount;
    renderBlocks(moveType);
}
function changeDirection(){ //블럭을 돌리는 메소드
    const direction=tempMovingItem.direction; //tempMovingItem에 direction값을 const direction에 저장
    direction===3 ? tempMovingItem.direction=0 : tempMovingItem.direction+=1;
    renderBlocks(); //renderBlocks를 실행. 
                    //실행되면 변경된 값들을 새로 저장하여 블럭을 돌림.
}
function changeReverseDirection(){
    const direction=tempMovingItem.direction;
    direction===0 ? tempMovingItem.direction=3 : tempMovingItem.direction-=1;
    renderBlocks();
}
function dropBlock(){
    clearInterval(downInterval);
    downInterval=setInterval(()=>{
        moveBlock("top",1);
    },10)
}
function showGameoverText(){
    scoreDisplay.style.visibility="hidden";
    endingScore.innerHTML=score+" Line";
    gameText.style.display="flex";
}

//event handling
document.addEventListener("keydown",e=>{ //eventListner로 keydown, 즉 키가 눌리면 생성되는 값을 변수 e에 저장
    switch(e.keyCode){ //변수 e에 저장된 값을 switch로 구별하여 동작조절
        case 39: //오른쪽 방향키
            moveBlock("left",1); //moveType인 left에 amount(1)를 더한다.  
            break;
        case 37: //왼쪽 방향키
            moveBlock("left",-1); //moveType인 left에 amount(-1)를 더한다.
            break;
        case 40: //아래쪽 방향키  
            moveBlock("top",1);  //moveType인 top에 amount(1)를 더한다.
            break;
        case 38: //위쪽 방향키
            changeDirection(); //위쪽 방향키를 누르면 changeDirection메소드를 실행   
            break;
        case 32:
            dropBlock();
            break;
        case 17:
            changeReverseDirection();
        default: 
            break;
    }
})

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
    window.location.href="../html/jump.html";
}
nextButton.onclick=function(){
    window.location.href="../html/2048.html";
}