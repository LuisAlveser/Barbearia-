import  db from "../models/index.js"
import { Model, where } from "sequelize";
const {Cortes ,Barbeiro} = db;

async function adicionarCorte(req,res) {
    try {
        const id_user =req.params.id_user
        const barbeiro=await Barbeiro.findOne({where:{id_user:id_user}})
       
        if(!barbeiro){
             return res.status(404).json({mensagem:"ID do barbeiro não encontrada"})
        }
        const corte={
          id_barbeiro:barbeiro.id,
          nome: req.body.nome,
          preco:parseFloat(req.body.preco)
        }
        
        const cortecriado= await Cortes.create(corte)
    
        if(cortecriado){
            return res.status(201).json({mensagem:"Corte criado com suceso"})
        }
        
    } catch (error) {
        console.error(error);
         return res.status(500).json({mensagem:"Erro ao adicionar corte",error})
    }
}

async function excluir(req,res) {
    try {
        const id=req.params.id
        const corte=await Cortes.destroy({where:{id:id}});
        if(corte){
            return res.status(200).json({mensagem:"Corte excluido  com suceso"})
        }else{
             return res.status(404).json({mensagem:"Corte não encontrado"})
        }
        
    } catch (error) {
         return res.status(500).json({mensagem:"Erro ao excluir corte",error})
    }
    
}
async function atualizar(req,res) {
    const id =req.params.id
     try {
        const corte={
        nome:req.body.nome,
        preco:req.body.preco
        }
        const corteatualizado=await Cortes.update(corte,{where:{id:id}})
        if(corteatualizado.length>0){
            return res.status(200).json({mensagem:"Cortes atualizado com sucesso"})
        }else{
             return res.status(404).json({mensagem:"Corte não encontrado"})
        }
    
   } catch (error) {
       return res.status(500).json({mensagem:"Erro ao atualizar corte",error})
  }   
}
async function listarCortesBarbeiro(req,res) {
    const id_barbeiro=req.params.id_barbeiro
    try {
        const cortes=await Cortes.findAll({where:{id_barbeiro:id_barbeiro}})
        if(cortes.length > 0){
            return res.status(200).json(cortes)
        }else{
           return res.status(404).json({mensagem:"Não existem cortes relacionados a esse barbeiro"}) 
        }
    } catch (error) {
         return res.status(500).json({mensagem:"Erro ao listar cortes por barbeiro",error})
    }
    
}
 export default{
      adicionarCorte:adicionarCorte,
      excluir:excluir,
      atualizar:atualizar,
      listarCortesBarbeiro:listarCortesBarbeiro
}