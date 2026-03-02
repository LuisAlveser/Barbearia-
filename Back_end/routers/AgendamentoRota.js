import express from 'express'
const router=express.Router();
import AgendamentosController from "../controllers/AgendamentosController.js";

router.patch("/:id",AgendamentosController.cancelarAgendamento)
router.get("/barbeiro/:id_barbeiro",AgendamentosController.buscarAgendamentoPorBardeiro)
router.post("/:id_barbeiro/:id_cliente",AgendamentosController.criarHorario)
router.get("/cliente/:id_cliente",AgendamentosController.buscarAgendamentoPorCliente)

export default router;