export {};

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return;
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((d) => enviar(d, mensagem));
}

// function teste(): void { return 10; } // Erro: Type 'number' is not assignable to type 'void'.

notificarTodos(['ana@escola.com'], 'Reunião de pais sexta às 19h', porEmail);
notificarTodos(['joao.resp'], 'Reunião de pais sexta às 19h', porApp);
notificarTodos(['(69) 99999-0000'], 'x'.repeat(161), porSms);
notificarTodos(['(69) 99999-0000'], 'Reunião sexta 19h', porSms);

// Reflexão: um `() => number` é atribuível a um tipo `() => void` porque o
// TypeScript ignora o valor retornado nesse contexto — a regra do `void`
// significa "o chamador não vai usar o retorno". Então
// `const contar: Notificador = (d, m) => m.length;` compila: o number é descartado.
// `const contar: Notificador = (d, m) => m.length;` compila: o number é descartado.
