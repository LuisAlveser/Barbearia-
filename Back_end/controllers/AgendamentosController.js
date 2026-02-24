import  db from "../models/index.js"
import { Model, where } from "sequelize";
const {Agendamentos,Usuario,Barbeiro} = db;
import { parseISO, isBefore, getHours, startOfHour } from 'date-fns';

async function criarHorario(req,res) {

   try {
    let data= req.body.data
    if (data.endsWith('Z')) {
      data = data.slice(0, -1); 
    }
  
    const dataAgendamento = startOfHour(parseISO(data));
       
    if (isBefore(dataAgendamento, new Date())) {
   return res.status(500).json({mensagem:"Você não pode agendar em uma data que já passou."});
}
    const hour = getHours(dataAgendamento);

   if (hour < 8 || hour >= 18) {
     return res.status(500).json({mensagem:"O prestador não atende neste horário."});
} 
    const cliente= await Usuario.findByPk(req.body.id_cliente)
    const barbeiro= await Barbeiro.findByPk(req.body.id_barbeiro)
   
    if(!cliente||!barbeiro){
         return res.status(404).json({mensagem:"Usuário ou Barbeiro não existem"});
    }
    const agendamento={
         id_cliente: req.body.id_cliente,
        id_barbeiro: req.body.id_barbeiro,
        data: req.body.data,
        cancelamento:false
    }
   
     const verifica_data=await Agendamentos.findOne({where:{data:agendamento.data}})
    
    if(verifica_data){
         return res.status(500).json({mensagem:"O horário indisponível"});
    }
    
    const agenda= await Agendamentos.create(agendamento)
    
    if(agenda){
        return res.status(201).json({mensagem:"Agendamento criado com sucesso"})
    }

   } catch (error) {
    console.error(error);
      return  res.status(500).json({mensagem:"Erro em criar agendamento",error})
   }    
}
async function buscarAgendamentoPorCliente(req,res) {
    const id_cliente=req.params.id_cliente
    try {
        const agendamentos=await Agendamentos.findAll({where:{id_cliente:id_cliente}})
        if(agendamentos.length>0){
            return res.status(200).json(agendamentos)
        }else{
            return res.status(404).json({mensagem:"Não existem agendamentos feitos"})
        }
        
    } catch (error) {
        return  res.status(500).json({mensagem:"Erro em buscar  agendamentos",error})
    }
    
}
async function buscarAgendamentoPorBardeiro(req,res) {
    const id_barbeiro=req.params.id_barbeiro
    try {
        const agendamentos=await Agendamentos.findAll({where:{id_barbeiro:id_barbeiro}})
        if(agendamentos.length>0){
            return res.status(200).json(agendamentos)
        }else{
            return res.status(404).json({mensagem:"Não existem agendamentos feitos"})
        }
        
    } catch (error) {
        return  res.status(500).json({mensagem:"Erro em buscar  agendamentos",error})
    }
    
}
async function cancelarAgendamento(req,res) {
    try {
        const id_agendamento=req.params.id
     
       const  agendamento= await Agendamentos.update({cancelamento:true},{where:{id:id_agendamento}})
       if(agendamento>0){
           return res.status(200).json({mensagem:"Cancelamento realizado com sucesso"})
       }else{
          return res.status(404).json({mensagem:"Esse Horário não exise"})
       }
    } catch (error) {
         return  res.status(500).json({mensagem:"Erro em cancelar  agendamentos",error})
    }
    
}
export default{
    criarHorario:criarHorario,
    buscarAgendamentoPorCliente:buscarAgendamentoPorCliente,
    buscarAgendamentoPorBardeiro,
    cancelarAgendamento:cancelarAgendamento
}