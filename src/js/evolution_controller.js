// Para melhor visualização, cada indivíduo terá uma cor.
const colors = [
    "blue",
    "blueviolet",
    "brown",
    "red",
    "darkorange",
    "darkred",
    "white",
    "gray",
    "fuchsia",
    "lightgreen",
];

const population = create_initial_population();
const max_generations = 100;
let generation = 1;
let players = setup_game(population);

// Roda o jogo pela primeira vez
process();

function setup_game(population) {
    const players = [];
    for (let i = 0; i < population.length; i++) {
        const individual = population[i];
        const color = colors[i];
        let pad = new Pad(i, color);
        let ball = new Ball(pad);
        const brain = new Brain(i, ball, individual);
        players.push({
            pad: pad,
            ball: ball,
            brain: brain
        });
    }
    return players;
}

function end_generation() {
    generation += 1;
    console.log("Geração: " + generation);
    if (generation < max_generations) {
        players = evolve(players);
        process();
    } else {
        finish();
    }
}

function evolve(players) {
    const population = players.map(function(player) {
        return player.brain.individual;
    });
    const new_individuals = [];
    const elitism_individuals = elitism(players);
    const elitism_number = Math.floor(population.length / 100 * elitism_rate);
    calculate_fitness(population);
    while (new_individuals.length < population_size - elitism_number) {
        const father = selection(population);
        const mother = selection(population);
        const child = crossover(father, mother);
        mutation(child);
        new_individuals.push(child);
    }
    new_individuals.concat(elitism_individuals);
    const new_players = setup_game(new_individuals);
    return new_players;
}

function finish() {
    console.log("fim da simulação");
}
