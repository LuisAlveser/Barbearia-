import express from 'express'
import CorteController from '../controllers/CorteController.js';
const router=express.Router();

router.patch("/:id",CorteController.atualizar)
router.post("/:id_barbeiro",CorteController.adicionarCorte)
router.delete("/:id",CorteController.excluir)
router.get("/:id_barbeiro",CorteController.listarCortesBarbeiro)
export default router;