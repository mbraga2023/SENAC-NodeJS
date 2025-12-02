const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')
const authMiddleware = require ('../middlewares/authMiddleware')
router.use(authMiddleware);  
router.post('/', categoriaController.criar)
router.get('/', categoriaController.listar)
router.put('/:id', categoriaController.alterar)
router.delete('/:id', categoriaController.remover)


module.exports = router