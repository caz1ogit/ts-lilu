export {};

const paciente1: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'João Souza', telefone: '(69) 99999-1111' },
};

const paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alg = p.alergias && p.alergias.length > 0 ? p.alergias.join(', ') : 'Sem alergias registradas';
  // mostra "Sem alergias registradas" quando alergias for undefined ou array vazio
  return `${p.nome}, ${p.idade} anos. ${p.alergias ? `Alergias: ${alg}` : 'Sem alergias registradas'}`;
}

// paciente1.cpf = '000.000.000-00'; // Erro: Cannot assign to 'cpf' because it is a read-only property.
// paciente1.peso = 70; // Erro: Property 'peso' does not exist on type ...

console.log(resumo(paciente1));
console.log(resumo(paciente2));

const dados: object = paciente1;
// console.log(dados.nome); // Erro: Property 'nome' does not exist on type 'object'.
// Reflexão: `object` só garante que é não-primitivo, não expõe as chaves. O compilador
// não sabe que `dados` tem `nome`, então o acesso é negado. Precisaria de estreitamento/cast.
// `let x: {} = 10;` é aceito porque `{}` significa "qualquer valor não-nulo" (inclui primitivos,
// exceto null/undefined). Já `let y: object = 10;` dá erro porque `object` exclui primitivos.
const x: {} = 10;
void x;
