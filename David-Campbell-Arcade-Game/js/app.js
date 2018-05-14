// Enemies our player must avoid
var Enemy = function(x, y, move) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.move = move;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;

    // When the enemies go off the canvas, it resets the position of enemies to move across again
    if (this.x > 500) {
        this.x = -100;
        this.move = 100 + Math.floor(Math.random() * 256);
    }

    // Collision between player and enemies
    if (player.x < this.x + 50 &&
        player.x + 35 > this.x &&
        player.y < this.y + 35 &&
        50 + player.y > this.y) {

        //Resets player after collison
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, move) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.move = move;
    this.sprite = 'images/char-boy.png';
};

// Prevents player from moving beyond canvas wall boundaries
Player.prototype.update = function() {
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // If player reaches the top, they win the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;

        // Displays a alert window congratulating the player for winning
        alert("WINNER WINNER CHICKEN DINNER! GREAT JOB!");
        document.location.reload();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player movement
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.move + 55;
            break;
        case 'up':
            this.y -= this.move + 35;
            break;
        case 'right':
            this.x += this.move + 55;
            break;
        case 'down':
            this.y += this.move + 35;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];

// Position y is where the enemies will start
var enemyPosition = [60, 140, 220, 310];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(positionY) {
    enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random() * 256));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});