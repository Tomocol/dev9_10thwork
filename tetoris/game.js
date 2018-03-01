//Stage
var BLOCK_SIZE = 24;
var BLOCK_ROWS = 22;
var BLOCK_COLS = 12;
//12個の空白を後々作る
var SCREEN_WIDTH = BLOCK_SIZE * BLOCK_ROWS;
var SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_ROWS;
//Game condition
var GAME = 1;
var GAMEOVER = 0;
var EFFECT = 2;
//Block condition
var NON_BLOCK = 0;
var NOMAL_BLOCK = 1;
var LOCK_BLOCK = 3;
var WALL = 9;

//EFFECT
var EFFECT_ANIMATION = 2;
//Color
var BACK_COLOR = "#ddd";
var GAMEOVER_COLOR = "#fff";
var BLOCK_COLOR = "#000";
var LOCK_COLOR = "#333";
var WALL_COLOR = "#666";
var ERROR_COLOR = "#f00";
var EFFECT_COLOR1 = "#fff";
var EFFECT_COLOR2 = "#000";
//game components
var NEXTLEVEL = 10;

// Global variable
var canvas = null;
var g = null;
var stage = new Array(BLOCK_COLS);
//console.log(stage);
var field = new Array(BLOCK_COLS);
var bs;
var speed;
var frame;
var block = new Array();
//console.log(block);
var oBlock = new Array();
var blockType;
var x, y;
var mode;
var timer1;
var FPS;
var clearLine;

//Effect timming(flipFlop:0, effect speed, effect count:0)
var effectState = {
    flipFlop: 0,
    speed: 0,
    count: 0
};
//console.log(effectState);
// 初期化
function init() {
    clearTimeout(timer1);
    FPS = 30;
    clearLine = 0;
    //Set Canvas
    canvas = document.getElementById("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    g = canvas.getContext("2d");
    //effect settings
    effectState.flipFlop = 0;
    effectState.speed = 4;
    effectState.count = 0;

    //effect settings
    bs = BLOCK_SIZE;
    //effect settings
    block = [
        [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],

        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],

        [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],

        [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],

        [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],

        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],

        [
            [0, 0, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
    ];
    stage = [
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}
// stage settings
function setStage() {
    //表示するための配列
    for (var i = 0; i < BLOCK_ROWS; i++) {
        field[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    oBlock = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0, ]
    ];
    //stagedatcopy
    for (i = 0; i < BLOCK_ROWS; i++) {
        for (j = 0; j < BLOCK_COLS; j++) {
            field[i][j] = stage[i][j];
        }
    }
}
//ゲーム開始処理
function newGame() {
    setStage();
    //console.log(setStage());
    mode = GAME;
    frame = 1;
    speed = 30;
    clearTimeout(timer1);
    createBlock();
    mainLoop();
}

function createBlock() {
    if (mode == EFFECT) return;
    x = sx = Math.floor(BLOCK_COLS / 3);
    y = sy = 0;
    blockType = Math.floor(Math.random() * 7);
    //ブロックをコピー
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) { 
            oBlock[i][j] = block[blockType][i][j];
        //console.log(oBlock[i][j])★    
        }
    }
    if (hitCheck()) { 
        mode = GAMEOVER;
        console.log("GAMEOVER!");
    }
    putBlock();
}
//ブロックをロックする
function lockBlock() { 
    if (mode == EFFECT) return;
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++) { 
            if (oBlock[i][j]) field[i + y][j + x] = LOCK_BLOCK;
        }
    }
}
function putBlock() { 
    if (mode == EFFECT) return;
    for (var i = 0; i < 4; i++) { 
        for (var j = 0; j < 4; j++) { 
            if (oBlock[i][j]) field[i + y][j + x] = oBloock[i][j];
        }
    }
}
function clearBlock() {
    if (mode == EFFECT) return;
    for (var i = 0; i < 4; i++) { 
        for (var j = 0; j < 4; j++) {
            if (oBlock[i][j]) field[i + y][i + x] = NON_BLOCK;
         }
    }
}
//ブロックの回転処理
function rotateBlock() { 
    if (mode == EFFECT) return;
    clearBlock();
    var tBlock = [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
        [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) { 
        for (var j = 0; j < 4; j++) { 
            tBlock[i][j] = oBlock[i][j];
        }
    }
    //ブロックを回転
    for (var i = 0; i < 4; i++) { 
        for (var j = 0; j < 4; j++) { 
            oBlock[i][j] = tBlock[i][j];
        }
    }
    if (hitCheck()) { 
//元に戻す
        for (var i = 0; i < 4; i++) { 
            for (var j = 0; j < 4; j++) { 
                oBlock[i][j] = tBlock[i][j];
            }
        }
    }
    putBlock();
    return 0;    
}
// ブロックの当たり判定（移動が可能か、落下できるか）
function hitCheck() { 
    if (mode == EFFECT) return;
    for (var i = 0; i < 4; j++) { 
        for (var j = 0; j < 4; j++) { 
            if (field[i + y][j + x] && oBlock[i][j])
                return 1;    
        }
    }
    return 0;
}
//ラインが揃ったかチェックする
function lineCheck() { 
    if (mode == EFFECT) return;
    var count;
    var lieCount = 0;
    for (i = 1; i < BLOCK_ROWS - 2; i++) {
        count = 0;
        for (j = 0; jBLOCK_COLS; j++){
            if (field[i][j]) count++;
            else break;
        }
        if (count >= BLOCK_COLS) { //1ライン揃ったら。
            lineCount++;
            clearLine++;
            for (j = 1; j < BLOCK_COLS - 1; j++)field[i][j] = CLEAR_BLOCK;
            console.log("lineCount =" + lineCount);
            console.log("clearLine = " + clearLine);
        }
    }
    return lineCount;
}
//揃ったラインを消去する
function deleteLine() { 
    if(mode == EFFECT) return;
    for (var i = BLOCK_ROWS - 1; i >= 1; i--) {
        for (var j = 1; j < BLOCK_COLS - 1; j++){
            if (field[i][j] == CLEAR_BLOCK) {
                field[i][j] = field[i - 1][j];
                for (var above = i - 1; above >= 1; above--) { 
                    field[above][j] = field[above - 1][j];
                }
                i++;
            }
        }
     }
}
// gamemodeClear
function clearWindow() { 
    g.fillStyle = BACK_COLOR;//gはコンテキストを取得->読み込んでいる文脈を取得する

    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
};
//描画処理
function draw() { 
    clearWindow();
    for (var i = 0; i < BLOCK_COLS; i++) { 
        for (var j = 0; j < BLOCK_COLS; j++) { 
            switch (field[i][j]) {
                case NON_BLOCK:
                    g.fillStyle = BACK_COLOR;
                    break;
                case NOMAL_BLOCK:
                    g.fillStyle = BLOCK_COLOR;
                    break;
                case LOCK_BLOCK:
                    g.fillStyle = LOCK_COLOR;
                    break;
                case WALL:
                    g.fillStyle = WALL_COLOR;
                    break;
                default:
                    g.fillStyle = ERROR_COLOR;
            }
            g.fillRect(j * bs, i * bs, bs - 1, bs - 1);
        }
    }
}
// ライン消去
function effect() {
    var color = [EFFECT_COLOR, EFFECT_COROR2];

    effectState.flipFlop = 1 - effectState.flipFlop;//消去ブロックならエフェクト
    g.fillStyle=color[effectState.flipFlop];        
    for (var i = 0; i < BLOCK_ROWS; j++) { 
        if (field[i][j] == CLEAR_BLOCK) { 
            g.fillRect(j * bs, i * bs, bs - 1, bs - 1);
        }
    }
}
effect.flipFlop = 1 - effectState.flipFlop;
if (effectState.count > EFFECT_ANIMATION) { 
    mode = GAME;
    effectState.cont = 0;
    effectState.flipFlop = 0;
    deleteLine();
    createBlock();
}
effectState.count++;
function gameOver() { 
    for (var i = 0; i < BLOCK_ROWS; j++) { 
        if (field[i][j] && field[i][j] != WALL) { //ブロックのみ色を変える
            g.fillStyle = GAMEOVER_COLOR;
            g.fillRect = (j * bs, i * bs, bs - 1, bs - 1);

        }
    }
}

function mainLoop() { 
    if (mode == GAME) {
        sx = x; sy = y;
        if (frame % speed == 0) {
            clearBlock();
            y++;
            if (hitCheck()) {
                y = sy;
                lockBlock();
                if (lineCheck() > 0) {
                    mode = EFFECT;
                }
                createBlock();
            }
            putBlock();
        }
        draw();
    }
    else if (mode == GAMEOVER) { 
        gameOver();
    }
    else if (mode == EFFECT) {
        if (frame % effectState.speed == 0) {
            effect();
        }
    }
    frame++;
}
//var clearLine;
if (clearLine >= NEXTLEVEL) { 
    clearLine = 0;
    speed--;
    console.log("speedUP!:" + speed);
}
if (speed < 1) speed = 1;
timer1 = setTimeout(mainLoop, 1000 / FPS);
// キーボードイベント
window.onkeydown = keyDownFunc;
//操作
function keyDownFunc(e) {
    if (mode == EFFECT) return;
    if (mode == GAME) { 
        clearBlock();
        sx = x; sy = y;
        if (e.keyCode == 37) { 
            x--;
        }
        else if(e.keyCode == 40){
            y++;
        }
        if (hitCheck()) {
            x = sx;
            y = sy;
        }
        putBlock();
    }
    else if (mode == GAMEOVER) {
        if (e.keyCode == 13) { 
            newGame();
        }
    }
}
//起動処理
window.onload = function () {
    init();
    newGame();
};