export {};

const leituras: [cidade: string, temperatura: number][] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  let min = temps[0];
  let max = temps[0];
  for (const t of temps) {
    if (t < min) min = t;
    if (t > max) max = t;
  }
  return [min, max];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const [minima, maxima] = extremos(leituras.map(([, t]) => t));
const media: number = leituras.map(([, t]) => t).reduce((a, b) => a + b, 0) / leituras.length;
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

const contato1: [nome: string, telefone: string, email?: string] = [
  'Ana',
  '(69) 99999-0000',
  'ana@mail.com',
];
const contato2: [nome: string, telefone: string, email?: string] = ['Carlos', '(69) 98888-0000'];

const historico: [string, ...number[]] = ['Porto Velho', 34, 33, 35, 32, 34, 33, 31];
const [cidHist, ...tempsHist] = historico;
const mediaHist: number = tempsHist.reduce((a, b) => a + b, 0) / tempsHist.length;
void mediaHist; void contato1; void contato2;

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Ji-Paraná'; // Erro: Cannot assign to '1' because it is a read-only property.
void capitalOficial;
