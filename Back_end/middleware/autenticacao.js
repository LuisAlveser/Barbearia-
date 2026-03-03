import  jwt from 'jsonwebtoken';

async function autenticacao(req,res,next) {
    const Token =req.headers.authorization
    if(!Token){
       return res.status(404).json({messagem:"Usuário não autorizado"})
    }
    const partes=Token.split(" ")
   

     if (partes.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token' });
  }
     const [scheme, token] = partes;
     
      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformatado' });
    }

      jwt.verify(token,"Ola", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

   
    return next(); 
  });

}
export default  autenticacao