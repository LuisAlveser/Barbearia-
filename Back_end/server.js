import app from'./app.js'
const porta=3001
const cors = require('cors');
app.use(cors());
app.listen(porta,()=>{
    console.log("Servidor ligado")
});
