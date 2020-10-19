var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pacman, pacman_moving;
var enemyGroup, enemy, enemy1, enemy2, enemy3;
var starGroup, starImage;


var ground;

var gameOver, gameOverImg, restart, restartImage;

var score = 0;



function preload() {
  pacman_moving = loadAnimation("PACMAN.png", "PACMAN1.png", "PACMAN2.png");
  enemy1=loadImage("enemy.png");
  enemy2=loadImage("enemy1.png");
  enemy3=loadImage("enemy2.png");

  gameOverImg = loadImage("gameOver.png");

  starImage = loadImage("star.png");

  restartImage = loadImage("restart.png");

  
}

function setup() {
  createCanvas(800, 400);
  
  pacman = createSprite(40,350);
  pacman.addAnimation('moving', pacman_moving);
  pacman.scale=0.09;

  ground = createSprite(400, 390, 1800, 20);
  ground.shapeColor= "blue";
  ground.velocityX = -6;
  ground.x = ground.width /2;

  gameOver = createSprite(400, 200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(400, 300);
  restart.addImage(restartImage);
  restart.scale = 0.1;

  starGroup = new Group();
  enemyGroup = new Group();
  
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(0);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space") && pacman.y >= 300) {
      pacman.velocityY = -12;

    }
  
    pacman.velocityY = pacman.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;

    }

    pacman.collide(ground);
    spawnEnemy();
    spawnStars();

    if(enemyGroup.isTouching(pacman)){
      gameState = END;
  }


}
else if (gameState === END) {
  background(400);

  gameOver.visible = true;
  restart.visible = true;

  pacman.visible=false;
  ground.visible=false;

  enemyGroup.destroyEach();
  starGroup.destroyEach();

  if(mousePressedOver(restart)) {
    reset();
  }
  

}
  stroke("white");
  textSize(50);
  text("Score: "+ score, 100,50);

  drawSprites();
  
}

function spawnEnemy() {
  if(frameCount % 60 === 0) {
    enemy = createSprite(800, 360, 10, 10);
    enemy.velocityX = -(6 + 3*score/100);

   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: enemy.addImage(enemy1);
              break;
      case 2: enemy.addImage(enemy2);
              break;
      case 3: enemy.addImage(enemy3);
              break;
      default: break;
    }
              
    enemy.scale = 0.2;
    enemy.lifetime = 300;
    enemyGroup.add(enemy);
  }

}

function spawnStars() {

  if (frameCount % 60 === 0) {
    var star = createSprite(800, 200);
    star.y = Math.round(random(0, 200));
    star.addImage(starImage);
    star.scale = 0.1;
    star.velocityX = -3;
    
    star.lifetime = 400;
    
    star.depth = pacman.depth;
    pacman.depth = pacman.depth + 1;
    
    starGroup.add(star);
  }
  
}

function reset() {
  gameState = PLAY;  
  gameOver.visible = false;
  restart.visible = false;

  pacman.visible=true;
  ground.visible=true;

  enemyGroup.destroyEach();
  starGroup.destroyEach();
  
  score = 0;

}