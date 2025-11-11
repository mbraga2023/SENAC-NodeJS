const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors')


let produtos = [
    {id:1, nome:"iPhone12", preco:1800},
    {id:2, nome:"Tablet", preco:700},
    {id:3, nome:"TV 56polegadas", preco:3800}
]
let nextId =4 

app.use(express.json());
// app.use(cors())
app.use(cors({
  'origin': 'http://127.0.0.1:5500'
}))


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

app.get('/produtos', (req, res) => {
  return res.status(200).send(produtos)
});

app.post('/produtos',(req, res) =>{
  const {nome, preco} = req.body
  if(!nome || !preco){
    return res.status(400).send({message: "Nome e preço são obrigatórios"})
  }
  const novoProduto = {
    id: nextId ++,
    nome,
    preco
  }

  produtos.push(novoProduto)
  return res.status(201).send({message: novoProduto})
})

app.put("/produtos/:id", (req, res)=>{
  const id = parseInt(req.params.id)

  const {nome, preco} = req.body

  const indice = produtos.findIndex(produtoAtualizado=> produtoAtualizado.id === id)
  
  if(indice === -1){
  return res.status(404).send({message: "Produto não encontrado"})
}
  if(!nome || !preco){
  return res.status(400).send({message: "Nome e preço são obrigatórios"})
}
  produtos[indice] = {
    id:id,
    nome:nome,
    preco:preco
  }

  return res.status(200).send(produtos[indice])
})

app.delete("/produtos/:id", (req, res)=>{
  const id = parseInt(req.params.id)
  const tamanhoInicial = produtos.length
  produtos = produtos.filter(produtoAtual => produtoAtual.id !== id)

  if(produtos.length === tamanhoInicial){
      return res.status(404).send({message: "Produto não encontrado"})
  }

  return res.status(204).send()
})