export {};

type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };

type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

function calcularTarifa(v: Veiculo, horas: number): number {
  const h = Math.max(1, horas);
  switch (v.tipo) {
    case 'carro':
      return 8 + (h - 1) * 5;
    case 'moto':
      return 4 + (h - 1) * 2;
    case 'caminhao':
      return 15 + (h - 1) * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// Teste do never: se acrescentar `type Van = { readonly placa: Placa; tipo: 'van' };`
// e incluir na união `Veiculo = Carro | Moto | Caminhao | Van`, o `default` acima
// estoura: Type 'Van' is not assignable to type 'never'.
// Isso prova exaustividade — o compilador cobra o case que falta. O `never` garantiu
// que nenhum tipo da união passe batido pelo switch.

function fecharTicket(t: Ticket): Ticket {
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
  let valor = calcularTarifa(t.veiculo, horas);
  if (t.selo) valor = valor * 0.5;
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(msg: string): void {
  console.log(msg);
}

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerVeiculo(json: string): Veiculo {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }
  if (typeof parsed !== 'object' || parsed === null) return falhar('veículo inválido');
  if (!('placa' in parsed) || !('tipo' in parsed)) return falhar('veículo inválido');
  const o = parsed as { placa: unknown; tipo: unknown; portas?: unknown; cilindradas?: unknown; eixos?: unknown };
  if (typeof o.placa !== 'string') return falhar('veículo inválido');
  if (o.tipo === 'carro') {
    if (o.portas !== 2 && o.portas !== 4) return falhar('veículo inválido');
    return { placa: o.placa, tipo: 'carro', portas: o.portas };
  }
  if (o.tipo === 'moto') {
    if (typeof o.cilindradas !== 'number') return falhar('veículo inválido');
    return { placa: o.placa, tipo: 'moto', cilindradas: o.cilindradas };
  }
  if (o.tipo === 'caminhao') {
    if (typeof o.eixos !== 'number') return falhar('veículo inválido');
    return { placa: o.placa, tipo: 'caminhao', eixos: o.eixos };
  }
  if (typeof o.tipo === 'string') return falhar(`tipo "${o.tipo}" desconhecido`);
  return falhar('veículo inválido');
}

// Dados de teste
const tickets: Ticket[] = [
  { veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 }, periodo: [8, 11], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 }, periodo: [9, 10], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 }, periodo: [7, 12], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 }, periodo: [14, 16], selo: true, situacao: SituacaoTicket.Aberto },
];

const fechados: Ticket[] = tickets.map(fecharTicket);

fechados.forEach((t) => {
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
  const seloTxt = t.selo ? ' (selo -50%)' : '';
  registrar(`[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horas}h - R$ ${(t.valor ?? 0).toFixed(2)}${seloTxt}`);
});

const faturamento: number = fechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);

const contagem = fechados
  .map((t) => t.veiculo.tipo)
  .reduce((acc, tipo) => {
    acc[tipo] += 1;
    return acc;
  }, { carro: 0, moto: 0, caminhao: 0 } as { carro: number; moto: number; caminhao: number });
registrar(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

try {
  lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) registrar(`Erro ao ler veículo: ${erro.message}`);
}
