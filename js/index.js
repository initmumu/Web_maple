class Pos{
    constructor(){
        this.x = 200
        this.y = 300
    }
}

class Char{
    constructor(){
        this.pos = new Pos();

        this.img = new Image();
        this.img.src = "./image/char/leftStandChar.png"

        this.motion = "stand0"
    }
}

class Background{
    constructor(){
        this.img = new Image();
        this.img.src = "./image/imgBg.png"
    }
}


let bg = new Background();
let myChar = new Char();

var canvas; //도화지 객체
var context; //화가 객체


// 플레이어 이동 방향과 속도
var dx=0;
var dy=0;

// 키 이벤트로 인해 인식된 keycode변수
var keycode;

let standTimer = 0;
function loaded(){
    canvas= document.getElementById('c1');
    context= canvas.getContext('2d');

    runGame(); //게임을 진행하는 함수
    //10ms 마다 runGame()를 다시 호출
    setInterval(runGame,10); //1초에 100번 호출
    
}

function runGame(){
    standTimer += 1;
    if(standTimer % 50 == 0){
        console.log(myChar.img.src)
        charStandMotion();
    }
    moveAll(); //캐릭터 움직이기
    charGravity();
    drawAll(); // 이미지들 그리기
}

function moveAll(){
    //플레이어의 좌표 변경
    myChar.pos.x+=dx;
    myChar.pos.y+=dy;

}

function charGravity(){
    if(myChar.pos.y < 300)
        myChar.pos.y += 3
}

function charStandMotion(){
    if(myChar.motion == "stand0"){
        myChar.img.src = "./image/char/leftStandChar1.png"
        myChar.motion = "stand1"
    }
    else if(myChar.motion == "stand1"){
        myChar.img.src = "./image/char/leftStandChar2.png"
        myChar.motion = "stand2"
    }
    else if(myChar.motion == "stand2"){
        myChar.img.src = "./image/char/leftStandChar1.png"
        myChar.motion = "stand3"
    }
    else if(myChar.motion == "stand3"){
        myChar.img.src = "./image/char/leftStandChar.png"
        myChar.motion = "stand0"
    }
}

function drawAll(){
    //배경 그리기
    context.drawImage(bg.img,0,0);
    //플레이어 그리기
    context.drawImage(myChar.img, myChar.pos.x, myChar.pos.y, 55, 73);

    // 키 코드값 글씨 그리기
    /*
    context.fillStyle="white";
    context.font="30px sans-serif";
    context.fillText(keycode, 10, 40);
    */
}

function keydown(){
    //눌러진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: 
            dx=-1;
            myChar.img.src = "./image/char/leftStandChar.png"
            break; //left
        case 38: dy=-1; break; //up
        case 39: 
            dx=1;             
            myChar.img.src = "./image/char/rightStandChar.png"
            break; //right
        case 40: dy=1; break; //down
    }
}

function keyup(){
    //떨어진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: 
        case 39: dx=0; break;
        case 38:
        case 40: dy=0; break;
    }
}