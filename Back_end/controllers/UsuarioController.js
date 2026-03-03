import token  from "jsonwebtoken";
import bcrypt from "bcrypt";
import  db from "../models/index.js"
import { where } from "sequelize";
const { Usuario,Barbeiro } = db;
async function cadastro (req,res) {
  
    try {
         const senha = req.body.senha;
        const senha_hash =   await bcrypt.hash(senha, 10);

        const user ={
            nome:req.body.nome,
            email:req.body.email,
            senha:senha_hash,
            regra:req.body.regra
        }
      
        const usuario= await Usuario.create(user);
        
        if(usuario){
         const tokenPayload = { id: usuario.id, email: usuario.email,regra:usuario.regra,nome:usuario.nome };
          const user_token  =  token.sign(tokenPayload,"Ola",{expiresIn: '1h'});
          return res.status(201).json({token:user_token})
        }
        
    } catch (error) {
       
       return res.status(500).json(error);  
    }
    
}
async function login(req,res) {
    
    try { 
        const email= req.body.email;
        const senha=req.body.senha;
       
    const usuario=await Usuario.findOne({where:{email:email}});
   
    const usuariosenha=usuario.senha;
    const comparacao =await bcrypt.compare(senha,usuariosenha);
    if(!usuario||!comparacao){
       return  res.status(404).json({mensagem:"Senha ou Email estão errados"})
    }else{
        const tokenPayload = { id: usuario.id, email: usuario.email ,regra:usuario.regra,nome:usuario.nome};
        const user_token  =  token.sign(tokenPayload,"Ola",{expiresIn: '1h'});
        return res.status(200).json({token:user_token})
    }
} catch (error) {
        return res.status(500).json({mensagem:"Erro ao logar",error})
}
    
}
async function atualizar(req,res) {
    try {
        const id =req.params.id;
        const usuario={
            nome:req.body.nome,
            email:req.body.email,    
        }
        if(req.body.senha){
              const senha =req.body.senha;
              const senha_hash= await bcrypt.hash(senha,10)
              usuario.senha=senha_hash
              
        }
        const usuarioatualizado= await Usuario.update(usuario,{where:{id:id}})
        if(usuarioatualizado>0){
             return res.status(200).json({mensagem:"Usuário atualizado com sucesso"})
        }else{
              return res.status(404).json({mensagem:"Usuário não encontrado"})
        }
    } catch (error) {
        return res.status(500).json({mensagem:"Erro ao atualizar usuário",error})
    }
}
async function excluir (req,res) {
    const id =req.params.id
        try {
    const usuario= await Usuario.findByPk(id);
    
    if(usuario){
         if(usuario.regra==="BARBEIRO"){
            console.log(usuario.regra)
        const barbeiro =await  Barbeiro.findOne({where:{id_user:usuario.id}})
        if(barbeiro){
            await barbeiro.destroy();
        }
         
     }
         await usuario.destroy();
        return res.status(200).json({mensagem:"Usuário excluido com sucesso "})
    }else{
          return res.status(404).json({mensagem:"Usuário não encontrado"})
    }

        
    } catch (error) {
         return res.status(500).json({mensagem:"Erro ao excluir  usuário",error})
    }
}
export default { 
    cadastro:cadastro, 
    login:login,
    atualizar:atualizar,
    excluir:excluir
};