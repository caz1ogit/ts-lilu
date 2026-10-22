export {};

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}
// lerComAny(respostaQuebrada);
// Erro SÓ na execução: TypeError: dados.temperatura.toFixed is not a function
// (temperatura é "quente", string não tem toFixed). O `any` calou o compilador.

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return falhar('campo "temperatura" inválido');
  }
  if (!('cidade' in parsed) || !('temperatura' in parsed)) {
    return falhar('campo "temperatura" inválido');
  }
  const obj = parsed as { cidade: unknown; temperatura: unknown };
  if (typeof obj.cidade !== 'string' || typeof obj.temperatura !== 'number') {
    return falhar('campo "temperatura" inválido');
  }
  return { cidade: obj.cidade, temperatura: obj.temperatura };
}

for (const r of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(r);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro: erro desconhecido');
    }
  }
}
