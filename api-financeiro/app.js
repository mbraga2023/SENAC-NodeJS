require('dotenv').config()
const express = require('express')
const { conexaoBanco } = require('./models')
const financeiroRoutes = require('./routes/financeiroRoutes')
const PORT = '3000'

const app = express()
app.use(express.json())

app.use('/financeiro', financeiroRoutes)

conexaoBanco.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Rodando na porta ${PORT}`)
    })
})
