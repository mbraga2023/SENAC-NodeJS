const express = require('express')
const router = express.Router()
const financeiroController = require('../controllers/financeiroController')
const authMiddleware = require ('../middlewares/authMiddleware')
router.use(authMiddleware);  
router.get('/', financeiroController.listar)
router.post('/', financeiroController.criar)
router.put('/:id', financeiroController.alterar)
router.delete('/:id', financeiroController.remover)

module.exports = router