/* -----------------------------------------------------------------------------------------------------------------------------------
 * Variables|Allows the game to work using variables.
 * ___________________________________________________________________________________________________________________________________
 */
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;

/* ------------------------------------------------------------------------------------------------------------------------------------
 * Executing Game Code|Game code used to move and use the snake.
 * ____________________________________________________________________________________________________________________________________
 */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000 / 30);

/* ------------------------------------------------------------------------------------------------------------------------------------
 * Game Functions|Functions for the ineer window.
 * ____________________________________________________________________________________________________________________________________
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
    
    gameOverMenu = document.getElementById("gameOver");
    
    setState("PLAY");

}

function gameLoop() {
    gameDraw();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
        }
    }

    function gameDraw() {
        context.fillStyle = "rgb(4, 6, 39)";
        context.fillRect(0, 0, screenWidth, screenHeight);

    }
    /* -------------------------------------------------------------------------------------------------------------------------------------
     * Snake Functions|Functions for snake and describing what the snake will do and look like.
     * _____________________________________________________________________________________________________________________________________
     */


    function snakeInitialize() {
        snake = [];
        snakeLength = 1;
        snakeSize = 20;
        snakeDirection = "down";

        for (var index = snakeLength - 1; index >= 0; index--) {
            snake.push({
                x: index,
                y: 0
            });
        }
    }


    function snakeDraw() {
        for (var index = 0; index < snake.length; index++) {
            context.fillStyle = "white";
            context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        }


    }


    function snakeUpdate() {
        var snakeHeadX = snake[0].x;
        var snakeHeadY = snake[0].y;


        if (snakeDirection == "down") {
            snakeHeadY++;
        }
        else if (snakeDirection == "right") {
            snakeHeadX++;
        }
        else if (snakeDirection == "up") {
            snakeHeadY--;
        }
        else if (snakeDirection == "left") {
            snakeHeadX--;
        }

        checkFoodCollisions(snakeHeadX, snakeHeadY);
        checkWallCollisions(snakeHeadX, snakeHeadY);
        var snakeTail = snake.pop();
        snakeTail.x = snakeHeadX;
        snakeTail.y = snakeHeadY;
        snake.unshift(snakeTail);
    }

    /* -----------------------------------------------------------------------------------------------------------------------------
     * Food Functions|Functions for food and what the food will do.
     * _____________________________________________________________________________________________________________________________
     */

    function foodInitialize() {
        food = {
            x: 0,
            y: 0
        };
        setFoodPosition();
    }


    function foodDraw() {
        context.fillStyle = "white";
        context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
    }

    function setFoodPosition() {
        var randomX = Math.floor(Math.random() * screenWidth);
        var randomY = Math.floor(Math.random() * screenHeight);

        food.x = Math.floor(randomX / snakeSize);
        food.y = Math.floor(randomY / snakeSize);
    }
    /* -----------------------------------------------------------------------------------------------------------------------------------------------------------
     * Input Functions|Functions that control the board allowing the snake to interact
     * -----------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function keyboardHandler(event) {
        console.log(event);




        if (event.keyCode == "37" && snakeDirection != "right") {
            snakeDirection = "left";
        }
        else if (event.keyCode == "38" && snakeDirection != "down") {
            snakeDirection = "up";
        }

        else if (event.keyCode == "39" && snakeDirection != "left") {
            snakeDirection = "right";
        }

        else if (event.keyCode == "40" && snakeDirection != "up") {
            snakeDirection = "down";
        }

    }



    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------
     *Collision Handling
     * ------------------------------------------------------------------------------------------------------------------------------------------------------------  
     */

    function checkFoodCollisions(snakeHeadX, snakeHeadY) {
        if (snakeHeadX == food.x && snakeHeadY == food.y) {
            snake.push({
                x: 0,
                y: 0
            });
            snakeLength++;
            setFoodPosition();
        }
    }
    function checkWallCollisions(snakeHeadX, snakeHeadY) {
        if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX < 0 * snakeSize) {
            setState("GAME OVER");
        }
    }

    /* -----------------------------------------------------------------------------------------------------------------
     *  Game State Handling
     * -----------------------------------------------------------------------------------------------------------------
     */


function setState(state) {
        gameState = state;
        showMenu(state);
}

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function showMenu(state) {
    console.log(state);
    if(state == "GAME OVER") {
        console.log("in if");
        displayMenu(gameOverMenu);
    }
}