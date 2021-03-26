var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
var PLAY=1;
var END=0;
gameState=PLAY;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup()
{
  createCanvas(400,400);
score=0;  
  monkey=createSprite(30,345,20,20);
  monkey.scale=0.13;
ground=createSprite(200,385,400,10);
  monkey.addAnimation("running",monkey_running);
  ground.velocityX=-3;
 
 bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("white");
  monkey.collide(ground);
   if (gameState===PLAY)
    {
  survivalTime=survivalTime+Math.round(getFrameRate()/60);
      text("Survival Time:"+survivalTime,280,50)
      text("Score:"+score,280,30);
      if(bananaGroup.isTouching(monkey))
        {
         score+=5;
          bananaGroup.destroyEach();
        }
  if(ground.x<200)
    {
ground.x=ground.width/2;
    }
  if(keyDown("space")&&monkey.y>=340)
    {
      monkey.velocityY=-15;
      
    }
  //console.log(monkey.y);
  monkey.velocityY+=0.8;
      switch(score)
        {
          case 10: monkey.scale(0.14);
            break;
              case 20: monkey.scale(0.15);
            break;
              case 30: monkey.scale(0.16);
            break;
              case 40: monkey.scale(0.17);
            break;
            default:
            break;
        }
  if(obstacleGroup.isTouching(monkey))
    {
      monkey.scale/=2;
      obstacleGroup.destroyEach();
    }
      if(monkey.scale===0.0325)
        {
gameState=END;
        }
        spawnObstacles();
   spawnBanana();
    }
else if(gameState===END)
  {
    monkey.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    text("GAME OVER",200,200);
    ground.destroy();
  }
 drawSprites(); 
}
function spawnObstacles()
{
  if(frameCount%300===0)
    {
      obstacle=createSprite(410,360,20,20);
      obstacle.velocityX=-2;
      obstacle.scale=0.15;
      obstacle.lifetime=250;
      obstacle.addImage(obstacleImage);
      obstacleGroup.add(obstacle);
    }
}
function spawnBanana()
{
  if(frameCount%170===0){
  banana=createSprite(410,Math.round(random(175,225)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.15;
  banana.velocityX=-3;
  bananaGroup.add(banana);
  }
}