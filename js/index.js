class Pos{
    constructor(){
        this.x = 200
        this.y = 300
    }
}

class Inertial{
    constructor(){
        this.dx = 0;
    }
}

class Char{
    constructor(){
        this.pos = new Pos();
        this.inertial = new Inertial();

        this.img = new Image();
        this.img.src = "./image/temp/rightStandChar0.gif"

        this.seeing = "right"
        this.prevMotion = 0
        this.motion = 0
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

// 키 이벤트로 인해 인식된 keycode변수
var keycode;

let canvas = document.getElementById('c1');
let context = canvas.getContext('2d');

let timer = 0;
let jumpTimer = 1;
let jumping = false

function loaded(){
    // 프레임 단위로 loaded 함수 호출
    requestAnimationFrame(loaded)
    
    // 프레임 타이머
    timer++

    jump()
    charMoveX()
    charMotionLoad()
    drawAll()
}

function charMoveX(){
    myChar.pos.x += myChar.inertial.dx
}

function jump(){
    if(jumping){
        myChar.pos.y -= 3;
        jumpTimer++;
    }
    else{
        if(myChar.pos.y < 300){
            myChar.pos.y += 3;
        }
        else if(myChar.motion == 20){
            myChar.motion = myChar.prevMotion;
            charStandMotion()
        }
    }
    if(jumpTimer > 15){
        jumping = false;
    }
}

function charMotionLoad(){

    if(myChar.motion < 10){
        if(timer % 50 == 0){
            charStandMotion();
        }
    }

    else if(myChar.motion < 20){
        if(timer % 12 == 0){
            charWalkingMotion()
        }
    }

    else if(myChar.motion == 20){
        charJumpMotion()
    }
}

function charJumpMotion(){
    if(myChar.seeing == "right"){
        myChar.img.src = "./image/temp/rightJumpChar.gif"
    }
    else if(myChar.seeing == "left"){
        myChar.img.src = "./image/temp/leftJumpChar.gif"
    }
}

function charStandMotion(){
    if(myChar.seeing == "right"){
        if(myChar.motion == 0){
            myChar.img.src = "./image/temp/rightStandChar1.gif"
            myChar.motion = 1
        }
        else if(myChar.motion == 1){
            myChar.img.src = "./image/temp/rightStandChar2.gif"
            myChar.motion = 2
        }
        else if(myChar.motion == 2){
            myChar.img.src = "./image/temp/rightStandChar3.gif"
            myChar.motion = 3
        }
        else if(myChar.motion == 3){
            myChar.img.src = "./image/temp/rightStandChar0.gif"
            myChar.motion = 0
        }
    }
    else if(myChar.seeing == "left"){
        if(myChar.motion == 0){
            myChar.img.src = "./image/temp/leftStandChar1.gif"
            myChar.motion = 1
        }
        else if(myChar.motion == 1){
            myChar.img.src = "./image/temp/leftStandChar2.gif"
            myChar.motion = 2
        }
        else if(myChar.motion == 2){
            myChar.img.src = "./image/temp/leftStandChar3.gif"
            myChar.motion = 3
        }
        else if(myChar.motion == 3){
            myChar.img.src = "./image/temp/leftStandChar0.gif"
            myChar.motion = 0
        }
    }
}

function charWalkingMotion(){
    if(myChar.seeing == "left"){
        if(myChar.motion == 10){
            myChar.img.src = "./image/temp/leftWalkingChar1.gif"
            myChar.motion = 11
        }
        else if(myChar.motion == 11){
            myChar.img.src = "./image/temp/leftWalkingChar2.gif"
            myChar.motion = 12
        }
        else if(myChar.motion == 12){
            myChar.img.src = "./image/temp/leftWalkingChar3.gif"
            myChar.motion = 13
        }
        else if(myChar.motion == 13){
            myChar.img.src = "./image/temp/leftWalkingChar0.gif"
            myChar.motion = 10
        }
    }
    else if(myChar.seeing == "right"){
        if(myChar.motion == 10){
            myChar.img.src = "./image/temp/rightWalkingChar1.gif"
            myChar.motion = 11
        }
        else if(myChar.motion == 11){
            myChar.img.src = "./image/temp/rightWalkingChar2.gif"
            myChar.motion = 12
        }
        else if(myChar.motion == 12){
            myChar.img.src = "./image/temp/rightWalkingChar3.gif"
            myChar.motion = 13
        }
        else if(myChar.motion == 13){
            myChar.img.src = "./image/temp/rightWalkingChar0.gif"
            myChar.motion = 10
        }
    }
}

function drawAll(){
    //배경 그리기
    context.drawImage(bg.img,0,0);
    //플레이어 그리기
    context.drawImage(myChar.img, myChar.pos.x, myChar.pos.y, 55, 73);
}

function keydown(){
    //눌러진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: // left
            myChar.seeing = "left"
            if(myChar.motion < 10){
                myChar.motion = 10
                myChar.img.src = "./image/temp/leftWalkingChar0.gif"
                myChar.inertial.dx = -3;
            }
            break;
        case 39:
            myChar.seeing = "right";
            if(myChar.motion < 10){
                myChar.motion = 10
                myChar.img.src = "./image/temp/rightWalkingChar0.gif"
                myChar.inertial.dx = 3;
            }
            break; //right
    }
}

function keyup(){
    //떨어진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: // left
            myChar.motion = 0
            myChar.inertial.dx = 0;
            myChar.img.src = "./image/temp/leftStandChar0.gif"
            break;
        case 39: // right
            myChar.motion = 0
            myChar.inertial.dx = 0;
            myChar.img.src = "./image/temp/rightStandChar0.gif"
            break;
    }
}


document.addEventListener('keyup', function(e){
    if(e.keyCode === 32){
        myChar.prevMotion = myChar.motion
        myChar.motion = 20 // 점프코드
        jumping = true
        jumpTimer = 1;
    }
})