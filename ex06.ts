export {};

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    default:
      return status; // Entregue ou Cancelado não muda
  }
}

let pedido: StatusPedido = StatusPedido.Recebido;
while (true) {
  // mapeamento reverso: número -> nome
  const nomeEtapa: string = StatusPedido[pedido];
  console.log(`[${pedido} - ${nomeEtapa}] ${mensagem(pedido)}`);
  if (pedido === StatusPedido.Entregue) break;
  pedido = avancar(pedido);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// const p2: FormaPagamento = 'PIX'; // Erro: Type 'string' is not assignable to type 'FormaPagamento'.
// Explicação: enum de string não aceita string solta; só os membros do enum.
// 'PIX' é string, não FormaPagamento. Tem que usar FormaPagamento.Pix.
