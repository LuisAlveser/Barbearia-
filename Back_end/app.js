import express from "express"
import UsuarioRota from "./routers/UsuarioRota.js";
import BarbeiroRota from "./routers/BarbeiroRota.js";
import CorteRota from "./routers/CorteRota.js";
import AgendamentoRota from "./routers/AgendamentoRota.js";
import autenticacao from './middleware/autenticacao.js'
import  cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());


app.use("/usuario", UsuarioRota.router);
app.use(autenticacao);
app.use("/barbeiro", BarbeiroRota.router);
app.use("/corte", CorteRota.router);
app.use("/agendamento", AgendamentoRota.router);

export default app;