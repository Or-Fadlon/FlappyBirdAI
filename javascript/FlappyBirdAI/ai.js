// Network input:
//  player velocityY
//  player X distance from pipe
//  player Y distance from top pipe
//  player Y distance from bottom pipe
//  player Y distance from ground
// Network output:
//  jump

let flappyNetwork;
let nodeVelocityY;
let nodeXDistanceFromPipe;
let nodeYDistanceFromTopPipe;
let nodeYDistanceFromBottomPipe;
let nodeYDistanceFromGround;

function GetGameStateByCanvasImage() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // look for objects inside the image
    // TODO: implement this function
}

function GetGameStateFromGlobalVariable() {
    // get the player velocityY
    // get the player X distance from pipe
    // get the player Y distance from top pipe
    // get the player Y distance from bottom pipe
    // get the player Y distance from ground
    // TODO: implement this function
}

function GetGameState() {
    // GetGameStateByCanvasImage(); // TODO: implement this function
    GetGameStateFromGlobalVariable();
}

function Jump() {
    // jump
}

function AILoop() {
    GetGameState();
    // get the network output
    let decision = flappyNetwork.decide();
    // apply the output to the game
    if (decision === "jump") {
        Jump();
    }
    // repeat
}

function InitAIAgent() {
    // create a neural network
    nodeVelocityY = 0;
    nodeXDistanceFromPipe = 0;
    nodeYDistanceFromTopPipe = 0;
    nodeYDistanceFromBottomPipe = 0;
    nodeYDistanceFromGround = 0;

    // load the weights
}

function Start() {
    // start the game loop
    // start the AI loop
}

function Main() {
    InitAIAgent();
    Start();
}