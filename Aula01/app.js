const express = require('express');
const app = express();
const PORT = 3000;

let produtos = [
    {id:1, nome:"iPhone12", preco:1.800},
    {id:2, nome:"Tablet", preco:800},
    {id:3, nome:"TV 56polegadas", preco:3.800}
]
let nextId =4 

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

app.get('/produtos', (req, res) => {
  return res.status(200).send(produtos)
});

