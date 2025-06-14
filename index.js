const { readFileSync } = require("fs");
const Repositorio = require("./repositorio");
const ServicoCalculoFatura = require("./servico");

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL", minimumFractionDigits: 2 })
    .format(valor / 100);
}

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: `
               + `${formatarMoeda(calc.calcularTotalApresentacao(apre))} `
               + `(${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
  return faturaStr;
}

const faturas = JSON.parse(readFileSync("./faturas.json"));
const calc = new ServicoCalculoFatura(new Repositorio());

console.log(gerarFaturaStr(faturas, calc));
