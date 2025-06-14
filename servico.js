class ServicoCalculoFatura {

  calcularTotalApresentacao(pecas, apre) {
    const peca = pecas[apre.id];
    let total = 0;
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) total += 1000 * (apre.audiencia - 30);
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20)
          total += 10000 + 500 * (apre.audiencia - 20);
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecida: ${peca.tipo}`);
    }
    return total;
  }

  calcularCredito(pecas, apre) {
    let creditos = Math.max(apre.audiencia - 30, 0);
    if (pecas[apre.id].tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalFatura(pecas, apresentacoes) {
    return apresentacoes
      .reduce((tot, apre) => tot + this.calcularTotalApresentacao(pecas, apre), 0);
  }

  calcularTotalCreditos(pecas, apresentacoes) {
    return apresentacoes
      .reduce((tot, apre) => tot + this.calcularCredito(pecas, apre), 0);
  }
}

module.exports = ServicoCalculoFatura;
