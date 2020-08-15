class Ball
{
    constructor(pad) {
        this.size = [10, 10];
        this.position = {
            x: Math.floor(Math.random() * canvas.height - (2 * this.size[0])) + this.size[0],
            y: 50
        };
        this.speed = 3;
        this.direction = {
            x: Math.random() < 0.5 ? -1 : 1,
            y: 1
        };
        this.color = pad.color;
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
        add_score_to_brain(this.pad.id);
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
            this.position.y < this.pad.position.y + this.pad.size[1] &&
            this.position.x > this.pad.position.x &&
            this.position.x < this.pad.position.x + this.pad.size[0]
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
    }
}

class Pad
{
    constructor(id, color) {
        this.id = id;
        this.position = {
            x: canvas.width / 2,
            y: 550
        };
        this.color = color;
        this.size = [100, 20];
        this.limit_left = 0;
        this.limit_right = canvas.width - this.size[0];
        this.move_distance = 10;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, ...this.size);
    }

    move_pad_left() {
        if (this.position.x > this.limit_left) {
            this.position.x -= this.move_distance;
        }
    }

    move_pad_right() {
        if (this.position.x < this.limit_right) {
            this.position.x += this.move_distance;
        }
    }
}

// Canvas -----------------------------------------------------------
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
function clean_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Game loop --------------------------------------------------------
function process() {
    clean_canvas();
    const generation_over = players.every(function(player) {
        return player.ball.is_game_over;
    });
    if (generation_over) {
        end_generation();
        return;
    }
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (player.ball.is_game_over) {continue}
        player.ball.detect_border_collision();
        player.ball.detect_top_collision();
        player.ball.detect_pad_collision();
        player.ball.move_ball();
        player.ball.detect_game_over();
        player.brain.think();
        player.ball.draw();
        player.pad.draw();
    }
    requestAnimationFrame(process);
}
