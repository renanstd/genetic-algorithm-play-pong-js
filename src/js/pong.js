class Ball
{
    constructor(color, layer, pad) {
        this.position = {
            x: canvas.width / 2,
            y: 50
        };
        this.speed = 3;
        this.direction = {
            x: Math.random() < 0.5 ? -1 : 1,
            y: 1
        };
        this.color = color;
        this.layer = layer;
        this.size = [10, 10];
        this.can_bounce = false;
        this.pad = pad;
        this.score = 0;
        this.is_game_over = false;
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, ...this.size);
    }

    move_ball() {
        this.position.x = this.position.x + this.speed * this.direction.x;
        this.position.y = this.position.y + this.speed * this.direction.y;
    };

    bounce_ball_horizontally() {
        this.direction.x = -this.direction.x;
    };

    bounce_ball_vertically() {
        this.direction.y = -this.direction.y;
    };

    increase_score() {
        this.score += 1;
        document.getElementById('score').innerHTML = this.score;
    }

    increase_speed() {
        this.speed += 0.5;
    };

    detect_border_collision() {
        const right_limit = canvas.width - this.size[0]
        if (this.position.x < 0 || this.position.x > right_limit) {
            this.bounce_ball_horizontally();
            this.can_bounce = true;
        }
    }

    detect_top_collision() {
        if (this.position.y < 0) {
            this.bounce_ball_vertically();
        }
    }

    detect_pad_collision() {
        if (
            this.can_bounce &&
            this.position.y + this.size[1] > this.pad.position.y &&
            this.position.y < pad.position.y + this.pad.size[1] &&
            this.position.x > pad.position.x &&
            this.position.x < pad.position.x + this.pad.size[0]
        ) {
            this.can_bounce = false;
            this.bounce_ball_vertically();
            this.increase_speed();
            this.increase_score();
        }
    }

    detect_game_over() {
        if (this.position.y > canvas.height) {
            this.game_over();
        }
    }

    game_over() {
        this.is_game_over = true;
        document.getElementById("final-score").innerText = this.score;
        document.getElementById("game-over").style = "display : inline";
        document.getElementById("play-again").focus();
    }
}


class Pad
{
    constructor(color, layer) {
        this.position = {
            x: canvas.width / 2,
            y: 550
        };
        this.color = color;
        this.layer = layer;
        this.size = [100, 20];
        this.limit_left = 0;
        this.limit_right = canvas.width - this.size[0];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, ...this.size);
    }

    move_pad_left() {
        if (this.position.x > this.limit_left) {
            this.position.x -= this.size[0] / 2;
        }
    }

    move_pad_right() {
        if (this.position.x < this.limit_right) {
            this.position.x += this.size[0] / 2;
        }
    }
}

// Canvas -----------------------------------------------------------
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
function clean_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Initialize elements ----------------------------------------------
let pad = new Pad("#FFFFFF", 0);
let ball = new Ball("#FFFFFF", 0, pad);
let ball2 = new Ball("pink", 0, pad);
let ball3 = new Ball("blue", 0, pad);

// Inputs -----------------------------------------------------------
document.addEventListener("keydown", function(e) {
    let key_code = e.which || e.keyCode;

    if (key_code == 37) { // left arrow
        pad.move_pad_left();
    } else if (key_code == 39) { // right arrow
        pad.move_pad_right();
    }
});

document.getElementById("play-again").addEventListener("click", function() {
    replay();
})

// Game functions ---------------------------------------------------
function replay() {
    pad = new Pad('blue', 0);
    ball = new Ball('blue', 0, pad);
    document.getElementById("game-over").style = "display : none";
    document.getElementById('score').innerHTML = ball.score;
    process();
}

function process() {
    if (ball.is_game_over) {return;}
    clean_canvas();
    ball.detect_border_collision();
    ball.detect_top_collision();
    ball.detect_pad_collision();
    ball.move_ball();
    ball.detect_game_over();
    ball.draw();
    pad.draw();
    requestAnimationFrame(process);
}

// ------------------------------------------------------------------
window.onload = function() {
    process();
}
