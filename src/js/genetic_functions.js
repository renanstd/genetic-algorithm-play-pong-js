// Variables --------------------------------------------------------
const chromossome_size = 2;
const population_size = 10;
const max_generations = 500;
const selection_method = 'roulette_wheel';
const crossover_probability = 0.9; // 90%
const mutation_probability = 0.05; // 05%
// ------------------------------------------------------------------

/**
 * Classe que representa um indivíduo, que será inserido no
 * cérebro para jogar para ver qual sua pontuação no jogo.
 */
class Individual
{
    constructor(chromossomes) {
        this.chromossomes = chromossomes;
        this.fitness = 0;
        this.score = 0;
    }
}


function create_initial_population() {
    let population = [];

    for (let i = 0; i < population_size; i++) {
        let chromossomes = [];

        for (let j = 0; j < chromossome_size; j++) {
            const random_value = Math.random();
            chromossomes.push(random_value);
        }

        const individual = new Individual(chromossomes);
        population.push(individual);
    }

    return population;
}

function calculate_fitness(population) {
    for (let i = 0; i < population.length; i++) {
        const element = population[i];
        element.fitness = element.score;
    }
}

function selection(population) {

}

function crossover(father, mother) {

}

function mutation(individual) {

}
