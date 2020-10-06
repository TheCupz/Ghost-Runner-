var tower, towerImage;
var doorImage, door, doorGroup;
var climber, climberImage, climberGroup;
var grimReaper, grimReaperImage;
var block, blockGroup;
var gamestate = "play";
var sound;

function preload () {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  grimReaperImage = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}

function setup () {
  createCanvas(600,600);
  
  sound.loop();
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  grimReaper = createSprite(300,200);
  grimReaper.addImage(grimReaperImage);
  grimReaper.scale = 0.3;
    
}

function draw () {
  
  background("black");
  
  if (gamestate === "play") {
    
  if(tower.y > 400) {
    tower.y = 300;
  }
  
  if (keyDown("Space")) {
    grimReaper.velocityY = -5; 
  }
  
  if (keyDown("left_arrow")) {
    grimReaper.x = grimReaper.x - 3; 
  }
  
  if (keyDown("right_arrow")) {
    grimReaper.x = grimReaper.x + 3;
  }
  
  if (climberGroup.isTouching(grimReaper)) {
    grimReaper.velocityY = 0;
  }
  
  
 grimReaper.velocityY = grimReaper.velocityY + 0.8;
  
spawnBalcony();
    
    if (blockGroup.isTouching(grimReaper)|| grimReaper.y > 600) {
      grimReaper.destroy();
      gamestate = "end";
    }
  
  drawSprites();
  }
  
  if (gamestate === "end") {
    stroke("Yellow");
    fill("Blue");
    textSize(50);
    text("Game Over!", 180,250);
    
  }
}

function spawnBalcony() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50, 10, 10);
    door.addImage(doorImage);
    climber = createSprite(200, 15, 10, 10);
    climber.addImage(climberImage);
    block = createSprite(200,15, 10, 10);
    block.width = climber.width;
    block.height = 2 ;
    door.x = Math.round(random(120,400));
    door.velocityY = 3;
    climber.x = door.x;
    climber.velocityY = 3;
    block.x = door.x; 
    block.velocityY = 3; 
    grimReaper.depth = door.depth;
    grimReaper.depth = grimReaper.depth + 1; 
    door.lifetime = 200;
    climber.lifetime = 200; 
    block.lifetime = 200;
    block.debug = true;
    doorGroup.add(door);
    climberGroup.add(climber);
    blockGroup.add(block);   
  }
}