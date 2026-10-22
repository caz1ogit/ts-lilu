export {};

const nomeDigitado: string = '   maria   da silva  ';

function formatarNome(nome: string): string {
  const minusculas = ['da', 'de', 'do'];
  return nome
    .trim()
    .split(' ')
    .filter((p) => p.length > 0)
    .map((p) => {
      const lower = p.toLowerCase();
      if (minusculas.includes(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

const precoLido = '12.40';
const quantidadeLida = '3un';

const preco: number = Number(precoLido); // 12.4
const quantidade: number = parseInt(quantidadeLida); // 3
const clienteFidelidade: boolean = true;

const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const total: number = subtotal - desconto;
const numeroCupom: number = 42;

const cupom = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
