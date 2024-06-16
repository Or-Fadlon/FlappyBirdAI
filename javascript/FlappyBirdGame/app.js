import { Background } from "./GameObjects/Background.js";
import { HUD } from "./GameObjects/HUD.js";
import { Ground } from "./GameObjects/Ground.js";
import { Bird } from "./GameObjects/Bird.js";
import { Pipe } from "./GameObjects/Pipe.js";
import { AudioPlayer } from "./AudioPlayer.js";

// Const
const audioPlayer = new AudioPlayer();
const BackgroundMusicVolume = 0.2;

const keysDown = {};
const spaceKeyCode = 32;

// Game State Values
let context;
let AnimationRequestID;
let life;
let score;
let pipeTimer;
// Game Objects
let background;
let hud;
let ground;
let player;
let pipesList = [];

window.StartGame = function (canvas) { Start(canvas); };

window.StopGame = function () { Stop(); };

window.GameMuteToggle = function () {
    audioPlayer.MuteToggle();
    // audioPlayer.Play("back", BackgroundMusicVolume, true);
};

function InitGameVariables() {
    pipeTimer = 100;
    life = 1;
    score = 0;
}

function InitGameObjects() {
    background = new Background(canvas.width, canvas.height);
    hud = new HUD(canvas.width, canvas.height);
    ground = new Ground(canvas.width, canvas.height);
    player = new Bird(canvas.width, canvas.height);
    pipesList = [];
}

function AddKeyboardListeners() {
    // key listeners
    addEventListener(
        "keydown",
        function (e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function (e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    // window.addEventListener(
    //     "keydown",
    //     function (e) {
    //         // space and arrow keys
    //         if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    //             e.preventDefault();
    //         }
    //     },
    //     false);
}

function Start(canvas) {
    context = canvas.getContext("2d");
    let hudFont = new FontFace('flappyFont', 'url(./resources/Fonts/flappy-font.ttf)');
    hudFont.load().then(function (font) {
        document.fonts.add(font);
        console.log("Font loaded");
    });
    InitGameVariables();
    InitGameObjects();
    AddKeyboardListeners();
    //audioPlayer.Play("back", BackgroundMusicVolume, true);

    AnimationRequestID = window.requestAnimationFrame(GameLoop)
}

function Restart() {
    InitGameVariables();
    InitGameObjects();
}

function Stop() {
    life = 0;
    audioPlayer.Stop();
    window.cancelAnimationFrame(AnimationRequestID);
    Restart();
}

function NotifyAI() {
    let nearestPipe;
    for (let i = 0; i < pipesList.length; i++) {
        if (!pipesList[i].scored) {
            nearestPipe = pipesList[i];
            break;
        }
    }
    if (!nearestPipe) return;
    let topPipeY = nearestPipe.gapCenter - nearestPipe.spacing / 2;
    let bottomPipeY = nearestPipe.gapCenter + nearestPipe.spacing / 2;

    window.DataForAI = {
        velocityY: player.velocityY,
        distanceFromPipeX: nearestPipe.x - (player.x + player.width),
        distanceFromTopPipeY: topPipeY - player.y,
        distanceFromBottomPipeY: bottomPipeY - (player.y + player.height),
        distanceFromGroundY: ground.y - (player.y + player.height)
    };
}

function GameLoop(timeStamp) {
    if (life !== 0) {
        Step();
        Collision();
        Render(timeStamp);
        NotifyAI(); // TODO: remove after implementing image processing
        AnimationRequestID = window.requestAnimationFrame(GameLoop);
    } else {
        let message = "default!";
        if (life === 0) {
            message = "You Lost!";
        }
        console.log(message);
        Stop();
    }
}

function HandlePlayerMovement() {
    if (keysDown[spaceKeyCode]) {
        player.Flap();
        audioPlayer.Play("flap");
        keysDown[spaceKeyCode] = false;
    }
}

function CreatePipes() {
    if (pipeTimer >= 100) {
        let minPipeGap = 300;
        let maxPipeGap = canvas.height - 420;
        let gapCenter = Math.floor(Math.random() * (maxPipeGap - minPipeGap + 1) + minPipeGap);
        let pipe = new Pipe(canvas.width, canvas.height, gapCenter);
        pipesList.push(pipe);
        pipeTimer = 0;
    }
    pipeTimer++;
}

function HandleScore() {
    pipesList.forEach((pipe) => {
        if (pipe.IsPlayerCollectedPipeScore(player)) {
            score++;
            audioPlayer.Play("point");
        }
    });
}

function RemoveNotVisiblePipes() {
    for (let i = 0; i < pipesList.length; i++) {
        if (pipesList[i].OutOfScreen()) {
            pipesList.splice(i, 1);
            break;
        }
    }
}

function Step() {
    background.Step();
    ground.Step();

    HandleScore();
    hud.Step();

    HandlePlayerMovement();
    CreatePipes();
    RemoveNotVisiblePipes();
    pipesList.forEach((pipe) => {
        pipe.Step();
    });
    player.Step(1, 0, canvas.height - 130);
}

function Collision() {
    let collideDetected = false;
    for (let i = 0; i < pipesList.length; i++) {
        if (pipesList[i].IsCollide(player)) {
            collideDetected = true;
            break;
        }
    }
    if (ground.IsCollide(player)) collideDetected = true;

    if (collideDetected) {
        audioPlayer.Play("hit");
        Stop();
    }
}

function Render(timeStamp) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    background.Render(context);

    pipesList.forEach((pipe) => {
        pipe.Render(context);
    });

    hud.Render(context, score, 1, timeStamp);
    ground.Render(context);
    player.Render(context);
}