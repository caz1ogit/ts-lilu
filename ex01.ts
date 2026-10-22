export {};

const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
const quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

const aberta = true; // tipo inferido: boolean

const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

const paesAno: number = 1_250_000;
const categoria: number = 0x1A; // 26 em decimal

// quantidade1 = 'doze'; // Erro: Type 'string' is not assignable to type 'number'.

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesAno}`);
console.log(`Categoria: ${categoria}`);
