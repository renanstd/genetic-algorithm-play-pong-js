class Brain
{
    constructor(id, ball, individual) {
        this.id = id;
        this.ball = ball;
        this.individual = individual;
        this.score = 0;
    }

    think() {
        let soma = 0;
        // Distância x está considerando a metade do tamanho do pad
        const distance_x = Math.abs(this.ball.position.x - this.ball.pad.position.x - (this.ball.pad.size[0] / 2));
        const distance_y = this.ball.pad.position.y - this.ball.position.y;
        // Divido o valor de input pelo seu limite máximo para normalizar entre 0 e 1
        soma += (distance_x / 500) * this.individual.chromossomes[0];
        soma += (distance_y / 600) * this.individual.chromossomes[1];
        // soma += (this.ball.pad.position.x / 600) * this.individual.chromossomes[2];
        // soma += (this.ball.speed / 12.5) * this.individual.chromossomes[2];

        // Divido 1.0 por 3 para termos assim 3 possíveis outputs em faixas de 0.33 cada
        if (soma <= 0.33) {
            this.ball.pad.move_pad_left();
        } else if (soma > 0.33 && soma <= 0.66) {
            // this.ball.pad.move_pad_right();
        } else {
            this.ball.pad.move_pad_right();
        }
    }
}


function add_score_to_brain(id) {
    const target = players.filter(function(player) {
        return player.brain.id == id;
    })
    target[0].brain.individual.score += 1;
}
