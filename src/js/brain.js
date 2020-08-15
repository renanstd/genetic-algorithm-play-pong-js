class Brain
{
    constructor(id, ball, individual) {
        this.id = id;
        this.ball = ball;
        this.individual = individual;
    }

    think() {
        let soma = 0;
        // Divido o valor de input pelo seu limite máximo para normalizar entre 0 e 1
        soma += this.ball.position.x / 600 * this.individual.chromossomes[0];
        soma += this.ball.position.y / 600 * this.individual.chromossomes[1];
        soma += this.ball.pad.position.x / 600 * this.individual.chromossomes[2];
        soma += this.ball.speed / 12.5 * this.individual.chromossomes[3];
        soma = soma / 2.0;

        // Divido 1.0 por 3 para termos assim 3 possíveis outputs em faixas de 0.33 cada
        if (soma <= 0.33) {
            this.ball.pad.move_pad_left();
        } else if (soma > 0.33 && soma <= 0.66) {
            // dont move
        } else {
            this.ball.pad.move_pad_right();
        }
    }
}
