import express from 'express'
import BarbeiroController from '../controllers/BarbeiroController.js';

const router=express.Router();


router.post("/:id_user",BarbeiroController.criar);
router.patch("/:id_user",BarbeiroController.atualizar);
router.get("/",BarbeiroController.buscarBarbeiros);
router.get("/:id",BarbeiroController.buscarPorId);
export default{router};
