export {};

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  return c.toUpperCase();
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
const camiseta: TamanhoCamiseta = 'M';
// const errada: TamanhoCamiseta = 'XG'; // Erro: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

const codigo: number | string = 42;
const complemento: string | null = null;
const endereco = `Rua das Flores, 100 - ${complemento ?? '(sem complemento)'}`;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

const r = 'sul'; // const: tipo literal 'sul', passa em calcularFrete
// let r2 = 'sul'; // let: tipo inferido string, NÃO passa em calcularFrete
// calcularFrete(r2); // Erro: Argument of type 'string' is not assignable to parameter of type ...
// Correção com as const: trava o tipo no literal
const r2 = 'sul' as const;

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: ${endereco}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
console.log(`Frete (r2 as const): R$ ${calcularFrete(r2).toFixed(2)}`);
