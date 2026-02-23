import  db from "../models/index.js"
import { where } from "sequelize";
const { Barbeiro ,Usuario} = db;

async function criar(req,res) {
    try {
       
        const barbeiro={
            id_user:req.params.id_user,
            bio:req.body.bio
        }
         
        const barbeirocriado=await Barbeiro.create(barbeiro);
    
          const r =await Usuario.update({regra:'BARBEIRO'},{where:{id:barbeiro.id_user}})
         
          
        if(barbeirocriado){
            return res.status(201).json({mensagem:"Barbeiro criado com suceso"})
        }else{
             return res.status(404).json({mensagem:"Id de usuário não encontrada"})
        }
        
    } catch (error) {
         return res.status(500).json({mensagem:"Erro ao criar barbeiro",error})
    }
}
async function atualizar(req,res) {
     const  id_user=req.params.id_user 
    try {
         const barbeiro={
            bio:req.body.bio
         }
         const babeiroatualizado=await Barbeiro.update(barbeiro,{where:{id_user:id_user}})
         if(babeiroatualizado>0){
             return res.status(200).json({mensagem:"Barbeiro atualizado com sucesso"})
         }else{
             return res.status(404).json({mensagem:"Barbeiro não encontrado"})
         }

    } catch (error) {
     return res.status(500).json({mensagem:"Erro ao atualizar  barbeiro",error})
}
    
}
async function buscarPorId(req,res) {
    const id =req.params.id
    try {
        const barbeiro=await Barbeiro.findByPk(id,{include:[{model:Usuario, attributes: { exclude: ['senha'] } }]});
        if(barbeiro){
            return res.status(200).json(barbeiro);
        }else{
             return res.status(404).json({mensagem:"Barbeiro não encontrado"})
        }
        
    } catch (error) {
      return res.status(500).json({mensagem:"Erro ao buscar  barbeiro",error})
    }
    
}
async function buscarBarbeiros(req,res) {
    const id =req.params.id
    try {
        const barbeiro=await Barbeiro.findAll({include:[{model:Usuario, attributes: { exclude: ['senha'] } }]});
        if(barbeiro){
            return res.status(200).json(barbeiro);
        }else{
             return res.status(404).json({mensagem:"Barbeiro não encontrado"})
        }
        
    } catch (error) {
      return res.status(500).json({mensagem:"Erro ao buscar  barbeiro",error})
    }
    
}
export default{
    criar:criar,
    atualizar:atualizar,
    buscarPorId:buscarPorId,
    buscarBarbeiros:buscarBarbeiros,
};