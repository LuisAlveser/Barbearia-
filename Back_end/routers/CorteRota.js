import express from 'express'
import CorteController from '../controllers/CorteController.js';
const router=express.Router();


router.post("/:id_user",CorteController.adicionarCorte)
router.delete("/:id",CorteController.excluir)
router.patch("/:id",CorteController.atualizar)
router.get("/:id_barbeiro",CorteController.listarCortesBarbeiro)
export default router;