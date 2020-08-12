// Variables --------------------------------------------------------
const chromossome_size = 3;
const population_size = 10;
const max_generations = 500;
const selection_method = 'roulette_wheel';
const crossover_probability = 0.9; // 90%
const mutation_probability = 0.05; // 05%
// ------------------------------------------------------------------

/**
 * Classe que representa um indivíduo, que será inserido no
 * cérebro para jogar para ver qual sua pontuação no jogo.
 * Cada indivíduo possui uma variável para guardar sua pontuação
 * no jogo, e uma variável para armazenar seu valor de fitness.
 */
class Individual
{
    constructor(chromossomes) {
        this.chromossomes = chromossomes;
        this.fitness = 0;
        this.score = 0;
    }
}

/**
 * Cria uma população inicial com valores aleatórios.
 */
function create_initial_population() {
    const population = [];
    for (let i = 0; i < population_size; i++) {
        const chromossomes = [];
        for (let j = 0; j < chromossome_size; j++) {
            const random_value = Math.random();
            chromossomes.push(random_value);
        }
        const individual = new Individual(chromossomes);
        population.push(individual);
    }
    return population;
}

/**
 * Função responsável por calcular o fitness de toda uma população.
 * O fitness no nosso caso é bem simples, é o score que o indivíduo
 * alcançou no jogo. Então essa função nada mais faz que passar o
 * valor do score para o fitness.
 *
 * @param {Individual[]} population Um array de indivíduos
 */
function calculate_fitness(population) {
    for (let i = 0; i < population.length; i++) {
        const element = population[i];
        element.fitness = element.score;
    }
}

/**
 * Função que realiza a seleção dos melhores indivíduos de uma
 * população
 * @param {Individual[]} population Um array de indivíduos
 */
function selection(population) {

}

function crossover(father, mother) {

}

function mutation(individual) {

}
