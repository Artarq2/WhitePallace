function status(request, response) {
  response.status(200).json({ chave: "tudo conforme o esperado" });
}

export default status;
