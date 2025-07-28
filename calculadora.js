document.addEventListener("DOMContentLoaded", () => {
  const porcoesInput = document.getElementById('porcoes');
  const porcaoBase = parseFloat(porcoesInput.dataset.base); // usa o atributo data-base
  const qtdSpans = document.querySelectorAll('.qtd');

  function formatarQuantidade(valor) {
    return Number.isInteger(valor) ? valor : valor.toFixed(2).replace('.', ',');
  }

  function atualizarIngredientes() {
    let novaPorcao = parseFloat(porcoesInput.value);

    if (!novaPorcao || novaPorcao < 1) {
      novaPorcao = 1;
      porcoesInput.value = 1;
    }

    const fator = novaPorcao / porcaoBase;

    qtdSpans.forEach(span => {
      const baseQtd = parseFloat(span.dataset.qtd);
      const unidade = span.dataset.unidade;
      const novaQtd = baseQtd * fator;
      span.textContent = `${formatarQuantidade(novaQtd)}${unidade ? ' ' + unidade : ''}`;
    });
  }

  porcoesInput.addEventListener('input', atualizarIngredientes);
  atualizarIngredientes();
});