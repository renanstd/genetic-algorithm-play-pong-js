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

// Insiro uns valores fictícios de score só para teste (apagar depois)
for (let i = 0; i < population.length; i++) {
    const element = population[i];
    element.score = Math.floor(Math.random() * 20 - 1) + 1;
}

console.log(population);

calculate_fitness(population);
const selected_a = selection(population);
const selected_b = selection(population);
const children = crossover(selected_a, selected_b);
const mutated_children = mutation(children);

console.log(selected_a);
console.log(selected_b);
console.log(children);
console.log(mutated_children);
