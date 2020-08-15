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

function add_score_to_brain(id) {
    const target = players.filter(function(player) {
        return player.brain.id == id;
    })
    target[0].brain.individual.score += 1;
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

function evolve() {
    const population = players.map(function(player) {
        return player.brain.individual;
    });
    const new_individuals = [];
    calculate_fitness(population);
    while (new_individuals.length < population_size) {
        const father = selection(population);
        const mother = selection(population);
        const child = crossover(father, mother);
        mutation(child);
        new_individuals.push(child);
    }
    const new_players = setup_game(new_individuals);
    return new_players;
}

function finish() {
    console.log("fim da simulação");
}
