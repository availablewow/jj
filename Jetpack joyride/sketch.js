var gameoversound, fly, ok
var gameoverimg, gameover, restoort, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var barry, barry_running, barry_fly;
var ground, invisibleGround, invisibleRoof, groundImage, alarm_light, alarm, scientist, catus, scientist2, catus2, catus3, scientist3, zapper, catus5, sun, sans, mon, moon, scientistgroup, alarm_lightgroup, scientistGroup;
var score = 0;


localStorage["Meters"] = 0;

function preload() {
  gameoversound = loadSound("game-over-sound.wav")
  gameoverimg = loadImage("gameover.png")
  restoort = loadImage("restart.png")
  mon = loadImage("moon.png")
  sans = loadAnimation("sun.png");
  barry_running = loadAnimation("barry2.png", "barry1.png", "barry3.png", "barry4.png")
  barry_fly = loadAnimation("barryfly.png");
  groundImage = loadImage("lab.jpeg")
  alarm_light = loadImage("alarm.png")
  scientist = loadImage("scientist.png")
  scientist2 = loadImage("scientist2.png")
  scientist3 = loadImage("scientist3.png")
  zapper = loadImage("zapper.png")

}

function setup() {


  createCanvas(windowWidth, windowHeight);


  sun = createSprite(width-50, 40, 20, 50);
  sun.addAnimation("sun", sans);
  sun.scale = 0.09;

  ground = createSprite(width/2, height-370, width, 20);
  ground.addImage("ground", groundImage);
  ground.scale = 1

  ground.x = ground.width / 4;
   
  barry = createSprite(170, height-100, 20, 50);

  barry.addAnimation("running", barry_running);

  barry.scale = 0.5;

  barry.addAnimation("barry_fly", barry_fly);

  gameover = createSprite(width/2, height/2-90);
  gameover.addImage("gameover", gameoverimg);
  restart = createSprite(width/2, height/2);
  restart.addImage("restart", restoort);
  invisibleGround = createSprite(width/2, height-60, width, 20);
  invisibleGround.visible = false

  invisibleRoof = createSprite(width/2, height-650, width, 20);
  invisibleRoof.visible = false

  var rand = Math.round(random(1, 100));
  alarm_lightGroup = createGroup();
  scientistGroup = createGroup();
  scientistGroup = createGroup();

  barry.setCollider("circle", 0, 0, 80)
  restart.scale = 0.3;
}


function draw() {

  background("lightblue");
  
 fill("black")
  text("score:" + score, width-300, 50);
  textSize(12);

 fill("black")
  textFont("papyrus");
  text("Distance Traveled : " + localStorage["Meters"], width-450, 50);
  

  if (gameState === PLAY) {
    restart.visible = false;
    gameover.visible = false;
    ground.velocityX = -(7 + score / 100);
    if (score > 800) {
      background("darkblue");

    }


    if (score > 900) {
      background("black");

    }

    if (score > 1000) {
      background("darkblue");

    }
    if (score > 1200) {
      background("lightblue");

    }
    if (score > 1400) {
      background("lightblue");
      sun.setVelocity(0, 0)

    }
    if ( (touches.length>0 ||keyDown("space")) || (touches.length>0 ||keyDown("up"))) {
      barry.velocityY = -18;
      touches = [];
    }
   console.log(height);
  console.log(barry.y)
    if (barry.y < height-155) {
      barry.changeAnimation("barry_fly", barry_fly);


    } else {
      barry.changeAnimation("running", barry_running);

    }
    score += Math.round(getFrameRate() / 60);
    spawnClouds();
    spawnObstacle();
    spawnObstacle2();
    barry.velocityY = barry.velocityY + 1

    if (score % 100 === 0 && score > 0) {
      ok.play();
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    if (barry.isTouching(scientistGroup)) {
      gameState = END;
      gameoversound.play();

    }
  } else if (gameState === END) {

    ground.velocityX = 0;
    sun.setVelocity(0, 0);
    barry.setVelocity(0, 0);
    scientistGroup.setVelocityXEach(0);
    scientistGroup.setVelocityXEach(0);
    alarm_lightGroup.setVelocityXEach(0);
    scientistGroup.setLifetimeEach(-1);
    alarm_lightGroup.setLifetimeEach(-1);
    scientistGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart) || touches.length>0) {
      reset();
      touches = [];
    }
  }









  barry.collide(invisibleGround);
  barry.collide(invisibleRoof);
  drawSprites();

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    alarm = createSprite(width+20, Math.round(random(20, -10)), 40, 10);
    alarm.velocityX = -7
    alarm.addImage("alarm", alarm_light)
    alarm.scale = 0.05
    alarm.depth = barry.depth;
    barry.depth += 1;
    alarm.lifetime = width/alarm.velocityX;
    alarm_lightGroup.add(alarm);
  }
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    scientist = createSprite(Math.round(random(width+30, width+130)), height-130, 40, 10);
    scientist.velocityX = -(7 + score / 100);
    var selectImage = Math.round(random(1, 3))
    switch (selectImage) {
      case 1:
        scientist.addImage("scientist", scientist);
        break
      case 2:
        scientist.addImage("scientist2", scientist2);
        break
      case 3:
        scientist.addImage("scientist3", scientist3);
        break
      default:
        break


    }

    scientist.lifetime = width/scientist.velocityY;
    scientist.scale = 0.3;
    scientistGroup.add(scientist)
    barry.depth = gameover.depth;
    scientist.depth = gameover.depth;
    gameover.depth += 1

    scientist.setCollider("rectangle", 0, 0, 50, 100);
  }
}

function spawnObstacle2() {
  if (frameCount % 110 === 0) {
    zapper = createSprite(Math.round(random(width+30, width+130)), Math.round(random(height-600,height- 100)), 40, 10);
    zapper.velocityX = -(8 + score / 100);
    zapper.addImage("zapper", zapper)
    scientistGroup.add(zapper)
    zapper.scale = 0.75;
    zapper.lifetime = width/zapper.velocityX;
    zapper.setCollider("circle", 0, 0, 30)
  }
}


function reset() {
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  scientistGroup.destroyEach();
  scientistGroup.destroyEach();
  alarm_lightGroup.destroyEach();

  barry.changeAnimation("running", barry_running);
  if (localStorage["Meters"] < score) {
    localStorage["Meters"] = score
  }

  score = 0;

}