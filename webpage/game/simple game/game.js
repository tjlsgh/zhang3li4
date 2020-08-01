// 画布
var canvas = document.createElement("canvas"); //创建画布元素
var ctx = canvas.getContext("2d"); //返回2d对象
canvas.width = 512; //设置宽 高
canvas.height = 480; 
document.body.appendChild(canvas); //在body添加canvas元素
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || 
                        w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// 背景图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){ //等待加载完成再进行绘制
    bgReady = true;
};
bgImage.src = "./images/background.png";

// 人物图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
};
heroImage.src = "./images/hero.png";

// 怪物图片
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
};
monsterImage.src = "./images/monster.png";


// 对象
var hero = {
    speed: 256,
};
var monster = {};
var monstersCaught = 0;



// 用户处理输入
var keysDown = {};

addEventListener(
    "keydown",
    function(e){
        keysDown[e.keyCode] = true; //获取事件的keyCode 按下相应的键 则置keysDown数组相应keyCode为true
    },
    false
);

addEventListener(
    "keyup",
    function(e){
        delete keysDown[e.keyCode]; //删除数组对应的keyCode
    },
    false
);



// 游戏结束时重置
var reset = function(){
    hero.x = canvas.width/2;
    hero.y = canvas.height/2; //英雄重置与地图中央

    monster.x = 32 + Math.random() * (canvas.width -64); 
    monster.y = 32 + Math.random() * (canvas.height -64); //怪物随机
}


// 根据输入更新人物状态
var update = function(modifier){
    if(38 in keysDown){ // 往上
        hero.y -= hero.speed * modifier;
    }
    if(40 in keysDown){ // 往下
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown){ // 往左
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown){ // 往右
        hero.x += hero.speed * modifier;
    }

    // hero 抓到 monster
    if(
        hero.x <= monster.x +32 &&
        monster.x <= hero.x +32 &&
        hero.y <= monster.y +32 &&
        monster.y <= hero.y +32  //判断是否接触
    ){
        ++monstersCaught;
        reset();
    }
};



// 渲染
var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(heroReady){
        ctx.drawImage(heroImage,hero.x,hero.y); //图片与hero对象绑定
    }
    if(monsterReady){
        ctx.drawImage(monsterImage,monster.x,monster.y); //图片与monster对象绑定
    }

    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught,32,32);
};

var main = function(){
    var now = Date.now();

    var delta = now - then;
    update(delta / 1000);
    render();
    
    then = now;
    requestAnimationFrame(main); // 定时循环操作 按帧对网页进行重绘
};

var then = Date.now();
reset();
main();

