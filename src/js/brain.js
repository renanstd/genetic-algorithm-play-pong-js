let chromosome_a = Math.random();
let chromosome_b = Math.random();
let chromosome_c = Math.random();

/**
 * Inputs:
 *   ball_position.x: um valor entre 0 e 600
 *   ball_position.y: um valor entre 0 e 600
 *   ball_speed: um valor entre 3 e 12.5
 *
 *   chromosomes: valores randômicos entre 0 e 1 (não incluso)
 *
 * Outputs:
 *   move_pad_left()
 *   move_pad_right()
 *   dont_move_pad
 */
function think() {
    let soma = 0;
    // Divido o valor de input pelo seu limite máximo para normalizar entre 0 e 1
    soma += ball_position.x / 600 * chromosome_a;
    soma += ball_position.y / 600 * chromosome_b;
    soma += ball_speed / 12.5 * chromosome_c;

    // Divido 1.0 por 3 para termos assim 3 possíveis outputs em faixas de 0.33 cada
    if (soma <= 0.33) {
        move_pad_left();
    } else if (soma > 0.33 && soma <= 0.66) {
        move_pad_right();
    } else {
        // Don't move pad
    }
}

const population = create_initial_population();
console.log(population);

calculate_fitness(population);
