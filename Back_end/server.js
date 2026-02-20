import express from "express"
import  UsuarioRota from "./routers/UsuarioRota.js";

const app =express();
app.use(express.json());
app.use("/usuario",UsuarioRota.router);
app.listen(3001,()=>{
    console.log("Servidor ligado")
});