const { readFileSync } = require("fs");
const ServicoCalculoFatura = require("./servico");

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL", minimumFractionDigits: 2 })
    .format(valor / 100);
}

function gerarFaturaStr(fatura, pecas, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${pecas[apre.id].nome}: `
               + `${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} `
               + `(${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;
  return faturaStr;
}

const faturas = JSON.parse(readFileSync("./faturas.json"));
const pecas   = JSON.parse(readFileSync("./pecas.json"));
const calc = new ServicoCalculoFatura();

console.log(gerarFaturaStr(faturas, pecas, calc));
