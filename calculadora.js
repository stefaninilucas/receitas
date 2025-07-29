document.addEventListener("DOMContentLoaded", () => {
  const porcoesInput = document.getElementById('porcoes');
  const porcaoBase = parseFloat(porcoesInput.dataset.base); // usa o atributo data-base
  const qtdSpans = document.querySelectorAll('.qtd');

  function formatarQuantidade(valor) {
    return Number.isInteger(valor) ? valor : valor.toFixed(2).replace('.', ',');
  }

  function atualizarIngredientes() {
    let novaPorcao = porcoesInput.value === "" ? "" : parseFloat(porcoesInput.value);

    if (novaPorcao === "" || isNaN(novaPorcao) || novaPorcao < 0) {
      // Se vazio, não atualiza quantidades
      qtdSpans.forEach(span => {
        span.textContent = span.dataset.qtd;
      });
      return;
    }

    const fator = novaPorcao / porcaoBase;

    qtdSpans.forEach(span => {
      const baseQtd = parseFloat(span.dataset.qtd);
      const novaQtd = baseQtd * fator;
      span.textContent = formatarQuantidade(novaQtd);
    });
  }

  porcoesInput.addEventListener('input', () => {
    let valor = parseInt(porcoesInput.value, 10);

    if (isNaN(valor) || valor < 0) {
      valor = 0;
    }
    porcoesInput.value = valor;
    atualizarIngredientes();
  });
  atualizarIngredientes();
});