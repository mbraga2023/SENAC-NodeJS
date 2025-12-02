require('dotenv').config()
const express = require('express')
const { conexaoBanco } = require('./models')
const financeiroRoutes = require('./routes/financeiroRoutes')
const authRoutes = require('./routes/authRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')

const PORT = '3000'

const app = express()
app.use(express.json())

app.use('/financeiro', financeiroRoutes)
app.use('/categoria', categoriaRoutes)
app.use('/auth', authRoutes)

conexaoBanco.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Rodando na porta ${PORT}`)
    })
})
