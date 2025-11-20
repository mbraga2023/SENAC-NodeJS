module.exports = function normalizeFields(body) {
  if (!body) return;

  if (body.descricao)
    body.descricao = body.descricao.toLowerCase().trim();

  if (body.formaPagamento)
    body.formaPagamento = body.formaPagamento.toLowerCase().trim();

  if (body.tipo)
    body.tipo = body.tipo.toLowerCase().trim();
};
