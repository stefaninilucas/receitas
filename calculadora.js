document.addEventListener("DOMContentLoaded", () => {
  const porcoesInput = document.getElementById('porcoes');
  const porcaoBase = parseFloat(porcoesInput.dataset.base);
  const qtdSpans = document.querySelectorAll('.qtd');

  function formatarQuantidade(valor) {
    return Number.isInteger(valor) ? valor : valor.toFixed(2).replace('.', ',');
  }

  function atualizarIngredientes() {
    // Permite campo vazio
    if (porcoesInput.value === "") {
      qtdSpans.forEach(span => {
        span.textContent = span.dataset.qtd;
      });
      return;
    }

    let novaPorcao = parseFloat(porcoesInput.value);

    if (isNaN(novaPorcao) || novaPorcao < 0) {
      return;
    }

    const fator = novaPorcao / porcaoBase;

    qtdSpans.forEach(span => {
      const baseQtd = parseFloat(span.dataset.qtd);
      const novaQtd = baseQtd * fator;
      span.textContent = formatarQuantidade(novaQtd);
    });
  }

  porcoesInput.addEventListener('input', atualizarIngredientes);

  // Opcional: ao sair do campo vazio, volta para o valor base
  porcoesInput.addEventListener('blur', () => {
    if (porcoesInput.value === "") {
      porcoesInput.value = porcaoBase;
      atualizarIngredientes();
    }
  });
});