const porcoesInput = document.getElementById('porcoes');
const porcaoBaseSpan = document.getElementById('porcao-base');
const porcaoBase = parseInt(porcaoBaseSpan?.dataset?.base || 1);

// Função para formatar o número (sem casas decimais se for inteiro)
function formatarQuantidade(valor) {
  return Number.isInteger(valor) ? valor : valor.toFixed(2);
}

// Atualiza as quantidades dos ingredientes
function atualizarIngredientes() {
  let novaPorcao = parseInt(porcoesInput.value);

  if (!novaPorcao || novaPorcao < 1) {
    novaPorcao = 1;
    porcoesInput.value = 1;
  }

  const fator = novaPorcao / porcaoBase;
  document.querySelectorAll('.qtd').forEach(span => {
    const baseQtd = parseFloat(span.dataset.qtd);
    const unidade = span.dataset.unidade;
    const novaQtd = baseQtd * fator;
    span.textContent = `${formatarQuantidade(novaQtd)}`;
    if (unidade) span.textContent += ` ${unidade}`;
  });
}

if (porcoesInput) {
  porcoesInput.addEventListener('input', atualizarIngredientes);
  atualizarIngredientes(); // Inicializa ao carregar
}
