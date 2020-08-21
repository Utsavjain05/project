class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      player.getCount();

      form = new Form()
      form.display();
    }

    player10 = createSprite(100, 200);
    player10.addImage("player1", player1Img);
    player10.scale = 0.2;
    player20 = createSprite(300, 200);
    player20.addImage("player2", player2Img);
    player20.scale = 0.2;
    player30 = createSprite(500, 200);
    player30.addImage("player3", player3Img);
    player30.scale = 0.2;
    player40 = createSprite(700, 200);
    player40.addImage("player4", player4Img);
    player40.scale = 0.2;
    players = [player10, player20, player30, player40];
    dino = createSprite(500, 500);
    dino.addImage("dino", dinoImg);
    dino.scale = 0.2;
    //  life1=createSprite(400,400);
    //life2=createSprite(600,400);
    //life3=createSprite(800,400);
  }


  play() {
    form.hide();

    Player.getPlayerInfo();
    // Player.dino();    
    if (allPlayers !== undefined) {
      background("white");

      var index = 0;
      var position = 100;
      //x and y position of the cars
      var x = 200;
      var y;


      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
        position = position + 100;
        // if(index===player.index) {//position the cars a little away from each other in x direction
        x = displayWidth - allPlayers[plr].distanceX;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        players[index - 1].x = x;
        players[index - 1].y = y;
        text(allPlayers[plr].name + "=" + allPlayers[plr].life, position);
        console.log(allPlayers[plr]);
        console.log(plr);
        console.log(index);
        //  }
        if (index === player.index) {
          // console.log(player.index);
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          players[index - 1].shapeColor = "red";
          camera.position.x = players[index - 1].x;
          camera.position.y = players[index - 1].y;


        }


        //textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }


    }
    // console.log(player.index);

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distanceY += 10
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {

      player.distanceY -= 10
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {

      player.distanceX -= 10
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null) {

      player.distanceX += 10
      player.update();
    }

    if (player10.isTouching(dino) && player.index === 1) {
      player.life = player.life - 1;
    player.update();
      if (player.life === 0) {
        player10.destroy();
      }
    }

    if (player20.isTouching(dino) && player.index === 2) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player20.destroy();
      }
    }

    if (player30.isTouching(dino) && player.index === 3) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player30.destroy();
      }
    }

    if (player40.isTouching(dino) && player.index === 4) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player40.destroy();
      }
    }


    if (keyDown("space") && player.index === 1) {
      var bullet1 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      // player.update();
      bullet1.velocityY = -3;
      bullet1.lifetime = 100;
      bullet1Group.add(bullet1);
    }

    if (keyDown("space") && player.index === 2) {
      var bullet2 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      // player.update();
      bullet2.velocityY = -3;
      bullet2.lifetime = 100;
      bullet2Group.add(bullet2);
    }

    if (keyDown("space") && player.index === 3) {
      var bullet3 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      //  player.update();
      bullet3.velocityY = -3;
      bullet3.lifetime = 100;
      bullet3Group.add(bullet3);
    }
    if (keyDown("space") && player.index === 4) {
      var bullet4 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      // player.update();
      bullet4.velocityY = -3;
      bullet4.lifetime = 100;
      bullet4Group.add(bullet4);
    }

    if (dino.isTouching(bullet1Group || bullet2Group || bullet3Group || bullet4Group)) {
      player.count();

      count = count + 1;
      player.updateCount3(count);
    }

    if (count === 15) {
      dino.destroy();
      gameState = 2;
      game.update(2);
    }





    drawSprites();
  }

  play2() {
    form.hide();
    Player.getPlayerInfo();
    for (var plr in allPlayers) {
      //add 1 to the index for every loop
      index = index + 1;
      position = position + 100;
      // if(index===player.index) {//position the cars a little away from each other in x direction
      x = displayWidth - allPlayers[plr].distanceX;
      //use data form the database to display the cars in y direction
      y = displayHeight - allPlayers[plr].distanceY;
      players[index - 1].x = x;
      players[index - 1].y = y;
      text(allPlayers[plr].name + "=" + allPlayers[plr].life, position);
      console.log(allPlayers[plr]);
      console.log(plr);
      console.log(index);
      //  }
      if (index === player.index) {
        // console.log(player.index);
        stroke(10);
        fill("red");
        ellipse(x, y, 60, 60);

        players[index - 1].shapeColor = "red";
        camera.position.x = players[index - 1].x;
        camera.position.y = players[index - 1].y;


      }


      //textSize(15);
      // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
    }
      text("NEXT LEVEL", 400, 400);
      this.button2 = createButton("next");
      this.button2.mousePressed(() => {
      this.button2.hide();
      player.Counter();
      Counter = Counter + 1;
      player.updateCounter(Counter);
    })

    if (Counter === 4) {
      game.update(3);
    }
    drawSprites();
  }

  play3() {
    form.hide();
    Player.getPlayerInfo();
    for (var plr in allPlayers) {
      //add 1 to the index for every loop
      index = index + 1;
      position = position + 100;
      // if(index===player.index) {//position the cars a little away from each other in x direction
      x = displayWidth - allPlayers[plr].distanceX;
      //use data form the database to display the cars in y direction
      y = displayHeight - allPlayers[plr].distanceY;
      players[index - 1].x = x;
      players[index - 1].y = y;
      text(allPlayers[plr].name + "=" + allPlayers[plr].life, position);
     // console.log(allPlayers[plr]);
      //console.log(plr);
      //console.log(index);
      //  }
      if (index === player.index) {
        // console.log(player.index);
        stroke(10);
        fill("red");
        ellipse(x, y, 60, 60);

        players[index - 1].shapeColor = "red";
        camera.position.x = players[index - 1].x;
        camera.position.y = players[index - 1].y;


      }


      //textSize(15);
      // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
    }

    player.life = 3;
   player.update();

    if (player10.isTouching(enemy) && player.index === 1) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player10.destroy();
      }
    }
// maam if we want to write if condition of player.life =0 then destroy outside  if of player10 is touching 
//then we would have to write like this player.life===0 && player.index===1 and so on . So that computer does not get confused which player life is tlked about.
// and if we write it outside as it is then it would assume player.life of player1 and as soon as life becomes 0 it would destroy all the sprites of all te players.
//because according to its life is 0 and written is if player.life is 0 then destroy sprites so it would destroy rest of the sprites too becasue we ddint specified when life is 0 whose all sprite to be destroyed.
//i would explain like if we are on 1st player window and his index is 1 so but acc to code player10,20,30,40 sprite can be destroyed when this.life is 0 so as soon as only player1 life would be 0 it would enter into all others condition too and destroy them.
    if (player20.isTouching(enemy) && player.index === 2) {
        player.life = player.life - 1;
        player.update();
        if (player.life === 0) {
          player20.destroy();
        }
      }

    if (player30.isTouching(enemy) && player.index === 3) {
          player.life = player.life - 1;
          player.update();
          if (player.life === 0) {
            player30.destroy();
          }
        }
      
    if (player40.isTouching(enemy) && player.index === 4) {
            player.life = player.life - 1;
            player.update();
            if (player.life === 0) {
              player40.destroy();
            }
          }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
              player.distanceY += 10
              player.update();
      }

   if (keyIsDown(DOWN_ARROW) && player.index !== null) {

              player.distanceY -= 10
              player.update();
            }
            if (keyIsDown(RIGHT_ARROW) && player.index !== null) {

              player.distanceX -= 10
              player.update();
            }
            if (keyIsDown(LEFT_ARROW) && player.index !== null) {

              player.distanceX += 10
              player.update();
            }
            if (keyDown("space") && player.index === 1) {
              var bullet1 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              // player.update();
              bullet1.velocityY = -3;
              bullet1.lifetime = 100;
              bullet1Group.add(bullet1);
            }
            if (keyDown("space") && player.index === 2) {
              var bullet2 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              // player.update();
              bullet2.velocityY = -3;
              bullet2.lifetime = 100;
              bullet2Group.add(bullet2);
            }
            if (keyDown("space") && player.index === 3) {
              var bullet3 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              //  player.update();
              bullet3.velocityY = -3;
              bullet3.lifetime = 100;
              bullet3Group.add(bullet3);
            }
            if (keyDown("space") && player.index === 4) {
              var bullet4 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              // player.update();
              bullet4.velocityY = -3;
              bullet4.lifetime = 100;
              bullet4Group.add(bullet4);
            }
            //if(dino.isTouching(bullet1Group || bullet2Group || bullet3Group || bullet4Group)){
            //player.count();

            //count=count+1;
            //player.updateCount(count);
            //}

            count();
            count = 0;
            player.updateCount3(count);
            var enemy = createSprite(500, 500, 30, 30);
            enemy.addImage("enemy", enemyImg);
            enemy.scale = 0.5;
            if (enemy.isTouching(bullet1Group || bullet2Group || bullet3Group || bullet4Group)) {
              count = count + 1;
              player.updateCount3(count);
            }
            if (count === 30) {
              enemy.destroy();
              text("well played", 400, 400)
            }
            drawSprites();
          }
          // end(){
          //console.log("game ended")
          // console.log(player.rank);
          //game.update(2);

          //}
        }
  //why we createdd sprite in start function.
  //are they taking in built width and height.
  //what position we give to an image is taken from its centre or corner.
  //what is 0,0 in the canvas.
  //why is it happening like to which car we are pressing up arrow only that distance increse.
  //what about camera.
  //maam we are changing gameState in database and so on what basis we are saying if gameState===1 in sketch.j we have nowhere changed 
  //variable gameState of visual studio
  //index
  //why sprites are not bieng created as they are called in start function;
  //if(keyDown(knw)){
    //var bullet= create
  //
//if(SVGFEGaussianBlurElement.isTouching dino{
  //count=count+1;
  //gameState=3;
//}
//if()
//for next mission 
//If(gameStae 3)
//if player.index is one then it is prfeeded in computer to take things of that player.index
//if there are 4 vars of this.distanceX then why it is wrong here it should know by itself which this.distance to take
// why bullet position are not working.




//here gameState is changed to 3 but not in the play function . so sprites should disappear from there.