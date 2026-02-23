import express from "express"
import  UsuarioRota from "./routers/UsuarioRota.js";
import BarbeiroRota from "./routers/BarbeiroRota.js";
import CorteRota from "./routers/CorteRota.js";
import AgendamentoRota from "./routers/AgendamentoRota.js";
import autenticacao from './middleware/autenticacao.js'
const app =express();
app.use(express.json());
app.use("/usuario",UsuarioRota.router);
app.use(autenticacao)
app.use("/barbeiro",BarbeiroRota.router);
app.use("/corte",CorteRota.router);
app.use("/agendamento",AgendamentoRota.router);
app.listen(3001,()=>{
    console.log("Servidor ligado")
});