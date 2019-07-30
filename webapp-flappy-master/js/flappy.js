// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score=0;
var labelScore;
var player;
var pipes = [];
var gameGravity = 400;
var gameSpeed = 180;
var jumpPower = 150;



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/flappy.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock", "../assets/pipe_purple.png");



}
/*
 * Initialises the game. This function is only called once.
 */
function create() {

  game.stage.setBackgroundColor("#00ccff");
  game.add.text(10, 10, "Flap");
  game.add.text(450, 350, "to Rap");
  game.add.text(10, 350, "its time");
  game.add.text(450, 10, "Pap");
  player = game.add.sprite(50, 50,"playerImg");
  game.input.onDown.add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);

  labelScore=game.add.text(50,50, "0");
  player.anchor.setTo(0.5, 0.5);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 200;

  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(playerJump);


  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
  pipeInterval,
  generatePipe
  );






    // set the background colour of the scene
}




function update() {

  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);
  boundaryChecker()

}

function boundaryChecker(){
  if (player.y < 0 ||400<player.y) {
  gameOver();
}

}

function clickHandler(event) {
  game.add.sprite(event.x,event.y,"playerImg");
  changeScore();

}


function spaceHandler() {

  game.sound.play("score");

}

function changeScore(){
  score=score+1;
  labelScore.setText(score.toString());


}


function movePlayerUp() {
  player.y--;





}

function playerJump() {
  player.body.velocity.y = -jumpPower;



}

function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
  for (var count = 0; count < 8; count++) {
    if (count != gap && count != gap+1) {
      addPipeBlock(750, count * 50);

}
}
changeScore();
}




function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}

function changeGravity(g){
  gameGravity += g;
  player.body.gravity.y = gameGravity;
}

function gameOver(){
location.reload();
}
