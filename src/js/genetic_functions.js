// Variables --------------------------------------------------------
const chromossome_size = 3;
const population_size = 10;
const max_generations = 200;
const selection_method = 'tournament_selection';
const tournament_size = 3;
const crossover_probability = 0.9; // 90%
const mutation_probability = 0.1; // 10%
// ------------------------------------------------------------------

/**
 * Classe que representa um indivíduo, que será inserido no
 * cérebro para jogar o pong.
 * Cada indivíduo possui um cromossomo, que por sua vez é um
 * conjunto de 3 genes.
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
 * Cria uma população inicial de indivíduos, com cromossomos feitos
 * de valores aleatórios.
 *
 * @returns {Individual[]} Nova população de indivíduos
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
    let best_fitness = 0;
    for (let i = 0; i < population.length; i++) {
        const element = population[i];
        element.fitness = element.score;
        if (element.fitness > best_fitness) {
            best_fitness = element.fitness;
        }
    }
    console.log("Melhor fitness dessa população: " + best_fitness);
}


/**
 * Função que realiza a seleção dos melhores indivíduos de uma
 * população
 * O modo que utilizaremos neste exemplo, é o 'tournament_selection',
 * este método funciona selecionando sempre os X indivíduos com maior
 * fitness de cada população.
 *
 * @param {Individual[]} population Um array de indivíduos
 * @returns {Individual} Indivíduo escolhido
 */
function selection(population) {
    let selected;
    if (selection_method == 'tournament_selection') {
        const selected_individuals = [];
        // Seleciona X indivíduos aleatórios da população
        for (let i = 0; i < tournament_size; i++) {
            const random_index = random_int_between(0, population_size);
            selected_individuals.push(population[random_index]);
        }
        // Ordena esses X indivíduos pelo seu fitness
        const ordered_individuals = selected_individuals.sort(function(a, b) {
            return b.fitness - a.fitness;
        });
        // Seleciona o indivíduo que ficou em primeiro lugar nesse ranking
        selected = ordered_individuals[0];
    }
    return selected;
}


/**
 * Realiza o cruzamento entre 2 indivíduos, e retorna o filho deles
 *
 * @param {Individual} father Indivíduo A
 * @param {Individual} mother Indivíduo B
 * @returns {Individual} Filho resultante
 */
function crossover(father, mother) {
    const new_chromossome = [];
    new_chromossome.push(father.chromossomes[0]);
    new_chromossome.push(mother.chromossomes[1]);
    new_chromossome.push(father.chromossomes[2]);
    return new Individual(new_chromossome);
}


/**
 * Realiza a mutação de algum gene de um indivíduo.
 * Cada gene do cromossono possui uma chance X de sofrer mutação.
 * Caso aconteça, o valor deste gene é substituído por outro valor
 * aleatório entre 0 e 1.
 *
 * @param {Individual} individual O indivíduo que será mutado
 * @returns {Individual} Um novo indivíduo, com as mutações sofridas
 */
function mutation(individual) {
    const mutated_chromossomes = [];
    for (let i = 0; i < chromossome_size; i++) {
        const gene_selected = Math.random() < mutation_probability;
        if (gene_selected) {
            console.log("Ocorreu mutação");
            mutated_chromossomes.push(Math.random());
        }
        mutated_chromossomes.push(individual.chromossomes[i]);
    }
    return new Individual(mutated_chromossomes);
}


// Helper functions -------------------------------------------------
/**
 * Retorna um número aleatório entre o valor mínimo e máximo
 *
 * @param {int} min Valor mínimo
 * @param {int} max Valor máximo
 * @returns {int} Valor aleatório
 */
function random_int_between(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
