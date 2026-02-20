import express from "express"
import  UsuarioRota from "./routers/UsuarioRota.js";
import BarbeiroRota from "./routers/BarbeiroRota.js";

const app =express();
app.use(express.json());
app.use("/usuario",UsuarioRota.router);
app.use("/barbeiro",BarbeiroRota.router)
app.listen(3001,()=>{
    console.log("Servidor ligado")
});