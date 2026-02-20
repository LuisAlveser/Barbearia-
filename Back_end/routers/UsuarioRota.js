import express from "express"


import  UsuarioController from "../controllers/UsuarioController.js"
const router =express.Router();

router.post("/",UsuarioController.cadastro);
router.post("/login",UsuarioController.login);
router.patch("/:id",UsuarioController.atualizar);
router.delete("/:id",UsuarioController.excluir);
export default { router };