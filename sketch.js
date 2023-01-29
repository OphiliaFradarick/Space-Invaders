var bg, backgroundIMG;
var player, playerImg;
var alien, alienImg;
var UFOGroup, UFOImg;
var bulletGroup, bulletImg;
var coinGroup, coinImg;
var edges;
var gameStates="intro"; //start
var score=0;
var bgM, bgMA, winM, wimMA, lvl, lvlA, pnt, pntA, over, overA, startI, tutB, logo, tuto, menu;

function preload() {
  backgroundIMG=loadImage("bckg.jpg");
  alienImg=loadImage("alien_PNG41.png");
  playerImg=loadImage("astronaut.png");
  UFOImg = loadImage("UFO.png");
  bulletImg = loadImage("laser.png");
  coinImg = loadImage("Dollar-Gold-Coin.png");
  
  bgMA = loadSound("bg_music.mp3");
  winMA = loadSound("win.mp3");
  lvlA = loadSound("Level_up.mp3");
  pntA = loadSound("point.mp3");
  overA = loadSound("game_over.mp3");
  startI = loadImage("start.png");
  logo = loadImage("Space_invaders.png");
  tutB = loadImage("tut.png");
  tuto = loadImage("tutorial.png");
  menu = loadImage("th.jpeg");
}

function setup(){
  createCanvas(600,600);

  bg = createSprite(300,300,600,600);
  bg.addImage("bgIMG", backgroundIMG);
  bg.velocityX = 1;
  bg.scale = 0.3;
  
  player = createSprite(100,400,20,20);
  player.addImage("astroI", playerImg);
  player.scale = 0.08;

  edges = createEdgeSprites();

  UFOGroup = new Group();
  bulletGroup = new Group();
  coinGroup = new Group();

  startbutton = createImg("Play-removebg-preview.png");
  startbutton.position(190,10);
  startbutton.size(250,250);

  tutbutton = createImg("info-removebg-preview.png");
  tutbutton.position(190,150);
  tutbutton.size(250,250);

  menubutton = createImg("back-removebg-preview.png");
  menubutton.position(10,0);
  menubutton.size(150,150);
  
}

function draw(){
  background(backgroundIMG);
  drawSprites();

  if(!bgMA.isPlaying()){
    bgMA.play();
    bgMA.setVolume(0.2);
  }

  if(gameStates === "intro"){
    background(logo);
    startbutton.show();
    tutbutton.show();
    menubutton.hide();
  }

  if(gameStates === "intro"){
    background(logo);
    startbutton.mouseClicked(changeGameStateToStart)
  }

  if(gameStates === "intro"){
    background(logo);
    tutbutton.mouseClicked(changeGameStateToTut)
  }

  if(gameStates === "tut"){
    background(tuto);
    menubutton.show();
    menubutton.mouseClicked(changeGameStateToMenu)
  }

  //Create Infinity background
  if(bg.x>500){
    bg.x = 300
  }

  spawnCoins();

  if(coinGroup.isTouching(player)){
    coinGroup[0].destroy();
    score = score + 25;

     if(!pntA.isPlaying()){
        pntA.play();
        pntA.setVolume(0.2);
        }
  }
  

  //Applying game states
  if(gameStates==="start"){
    if(keyDown("down")){
      player.y = player.y+3;
    }
    if(keyDown("up")){
      player.y = player.y-3;
    }
    if(keyDown("right")){
      player.x = player.x+3;
    }
    if(keyDown("left")){
      player.x = player.x-3;
    }

    spawnUFOS();

    if(UFOGroup.isTouching(player)){
      UFOGroup[0].destroy();
      score = score - 50;
    }

    fill("white");
    rect(10, 45, 500, 20);
    fill("#f50057");
    rect(10, 45, score, 20);
    noStroke();

    if(score >= 500){
      gameStates = "level2"
      swal({
        title:"LEVEL 2",
        text : "Dodge the bullets",
        imageUrl:"https://media3.giphy.com/media/J4DB26DWjyrbndVO62/200w.webp?cid=ecf05e47lt41w00of9eiprpvej8rj5r6gydmh22pkkcs6ekx&rid=200w.webp&ct=g",
        imageSize:"150x150",
        confirmButtonText:"OK"
      })

       if(!lvlA.isPlaying()){
        lvlA.play();
        lvlA.setVolume(0.2);
      }
    }
    
  }
  
  if(gameStates=="level2"){

    if(keyDown("down")){
      player.y = player.y+3;
    }
    if(keyDown("up")){
      player.y = player.y-3;
    }
    if(keyDown("right")){
      player.x = player.x+3;
    }
    if(keyDown("left")){
      player.x = player.x-3;
    }


    spawnBullets();

    if(bulletGroup.isTouching(player)){
      bulletGroup[0].destroy();
      score = score - 100;
    }

    fill("white");
    rect(10, 45, 500, 20);
    fill("#f50057");
    rect(10, 45, score-500, 20);
    noStroke();


    if(score >= 1000){
      gameStates = "level3"
      swal({
        title:"LEVEL 3",
        text : "Avoid all obstacles",
        imageUrl:"https://tse3.mm.bing.net/th?id=OIP.wBUB9O6gZVBNdbLU1bpf_AHaFj&pid=Api&P=0",
        imageSize:"150x150",
        confirmButtonText:"OK"
      })

       if(!lvlA.isPlaying()){
         lvlA.play();
         lvlA.setVolume(0.2);
       }
    }

    if (score <= 450){
      gameStates==="over";

      swal({
        title:"Game Over",
        text:"You lost",
        imageUrl:"https://media2.giphy.com/media/XZDUebKuSiafNMo861/200w.webp?cid=ecf05e476mhzdsdtx93cpdic2e8shuylkq0oocwrt2h0iec2&rid=200w.webp&ct=g",
        imageSize:"200x200",
        confirmButtonText:"PLAY AGAIN"
      },
       function isConfirm(){
        window.location.reload()
        score=0;
       }
      )

       if(!overA.isPlaying()){
        overA.play();
        overA.setVolume(0.2);
        }
    }

   
  }

  if(gameStates=="level3"){

    if(keyDown("down")){
      player.y = player.y+3;
    }
    if(keyDown("up")){
      player.y = player.y-3;
    }
    if(keyDown("right")){
      player.x = player.x+3;
    }
    if(keyDown("left")){
      player.x = player.x-3;
    }

    spawnBullets();
    spawnUFOS();

    if(bulletGroup.isTouching(player)){
      bulletGroup[0].destroy();
      score = score - 100;
    }

    if(UFOGroup.isTouching(player)){
      UFOGroup[0].destroy();
      score = score - 50;
    }

    fill("white");
    rect(10, 45, 500, 20);
    fill("#f50057");
    rect(10, 45, score-1000, 20);
    noStroke();
      
    if (score <= 900){
      gameStates==="over";

      swal({
        title:"Game Over",
        text:"You lost",
        imageUrl:"https://media2.giphy.com/media/XZDUebKuSiafNMo861/200w.webp?cid=ecf05e476mhzdsdtx93cpdic2e8shuylkq0oocwrt2h0iec2&rid=200w.webp&ct=g",
        imageSize:"200x200",
        confirmButtonText:"PLAY AGAIN"
      },
       function isConfirm(){
        window.location.reload()
       }
      )

       if(!overA.isPlaying()){
        overA.play();
        overA.setVolume(0.2);
        }

    }

    if(score >= 1250){
      gameStates = "win";

      swal({
          title:"Congratulations",
          text:"You Won!!",
          imageUrl:"https://media2.giphy.com/media/D1gkyTke4KNsDd8soO/200w.webp?cid=ecf05e476mhzdsdtx93cpdic2e8shuylkq0oocwrt2h0iec2&rid=200w.webp&ct=g",
          imageSize:"200x200",
          confirmButtonText:"PLAY AGAIN"
      },
      function isConfirm(){
       window.location.reload()
      })

       if(!winMA.isPlaying()){
         winMA.play();
         winMA.setVolume(0.2);
         }

      UFOGroup.destroyEach();
      bulletGroup.destroyEach();
      coinGroup.destroyEach();
      
    }

    
  }

  player.collide(edges)

  fill("white");
  textSize(20);
  text("score: "+score, 20,20);
  
}

function spawnUFOS(){

  //if(score<100){
   fCount = frameCount
   if (frameCount % 150 === 0) {
    var UFO = createSprite(600,300,40,10);
    UFO.y = Math.round(random(10,590));
    UFO.addImage(UFOImg);
    UFO.scale = 0.04;
    //UFO.velocityX=-(2+score/100);
    UFO.velocityX=-(2)
    UFOGroup.add(UFO);
   }

}

function spawnBullets(){

  if(score > 500){
   if ( frameCount % 100 == 0) {
    var bullet = createSprite(600,0,40,10);
    bullet.x = Math.round(random(10,590));
    bullet.addImage(bulletImg);
    bullet.scale = 0.7;
    // bullet.debug = true;
    
    bullet.setCollider("circle", -90,  0, 50);
    bullet.velocityY=+(1)
    bulletGroup.add(bullet);
   }
  }

}

function spawnCoins(){

  if(frameCount % 30 == 0){
    var coin = createSprite(0,0,10,10);
    coin.addImage(coinImg);
    coin.scale = 0.07
    coin.x =  Math.round(random(10,590));
    coin.y =  Math.round(random(10,590));
    coinGroup.add(coin);
  }
  
}

function changeGameStateToStart(){
  gameStates = "start";
  startbutton.hide()
  tutbutton.hide();
}

function changeGameStateToTut(){
  gameStates = 'tut';
  tutbutton.hide();
  startbutton.hide()
}


function changeGameStateToMenu(){
  gameStates = "intro";
  menubutton.hide();
}