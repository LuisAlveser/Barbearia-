import { useNavigate,useLocation } from 'react-router-dom';
import Logo from "../assets/Logo.png"
import { FaRegUserCircle } from "react-icons/fa";
import { useState ,useEffect} from 'react';
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPen,FaTrash } from "react-icons/fa";
import '../Tela_Barbeiro/Tela_Barbeiro.css'
import { IoMdClose } from "react-icons/io";



function Cabecalho ({usuario,dadosCompletos}){
   const navegation=useNavigate();
    const token=  localStorage.getItem("token");
    console.log(token)
    const voltar=()=>{
        navegation("/Tela_Principal",{ state: { dados: {dadosCompletos ,token}} })
    }
   //console.log(dadosCompletos)
 
    return(
    <>
      <header className='cabecalho'>
         <div className='logoItens'>
            <img src={Logo} className='Logocab' />
            <h1 className='NomeSite'>CORTE JÁ</h1>
         </div>
        <div className='usuarioOpcao'>
          <FaRegUserCircle className='iconUser'/>
          <h2 className='NomeSite'>{usuario?.nome}</h2>
          <h3 className='regraUsuario'>{usuario?.regra}</h3>
         
          <button className='botaotelaPrincipal' onClick={voltar} >Voltar</button>
        
         
        </div>
    </header>
</>
    )
}
function MostrarBarbeiroeCortes({cortes,usuario,barbeiro,setFormAgenda,formAgenda}){
 //console.log("Dados que chegaram do Barbeiro:", barbeiro);
 //console.log("Dados que dadosCompletos id user :",usuario?.id);
//console.log("Dados de barbeiro id user ", barbeiro?.id_user);
const AtivarAgendamento=()=>{
    setFormAgenda(!formAgenda);
}
  if (!barbeiro) {
    return <h1 className='text'>Carregando dados...</h1>;
  }
  const id_usuario=usuario?.id
  const id_barbeiro=barbeiro?.id_user
    return(
        <>
        <FaRegUserCircle className='iconBarbeiro'/>
         <div className='infoBarbeiro'>
            <h2 className='text'>Nome: {barbeiro.Usuario?.nome}</h2>
            <h2 className='text'>Bio: {barbeiro.bio}</h2>
            <h1  className='text'>Cortes Disponíveis</h1>

              <div className='divisor'></div>
              {cortes.length === 0 ? (
        <h2 className='text' style={{textAlign: 'center', marginTop: '20px'}}>
            Este barbeiro ainda não cadastrou cortes.
        </h2>
    ) : (
        <ul className='listaCortes'>
            {cortes.map((corte) => (
                <li className='corte' key={corte.id}>
                    <h3 className='text'>{corte.nome}</h3>
                    <h3 className='text'>R$ {corte.preco}</h3>
                    {id_barbeiro===id_usuario?(
                    <div className='iconsDiv'>
                    <FaPen className='icon' /> 
                    <FaTrash className='iconLixo' />
                    
                </div>
                  ):( null

                 )}
            </li>
            ))}
        </ul>
    )}
            <div className='divisor'></div>
            {cortes.length === 0 ? "":
           <button className='botaoAgenda' onClick={AtivarAgendamento}>Agendar Horário</button>
            }
         </div>
         
         
       
     </>

 )

}
const agendamentoSchema = z.object({
  data: z.coerce.date().min(1,"A data é obrigatória"),
  
});
function Agendamento({usuario,barbeiro,formAgenda,setFormAgenda,token}){
  
    const id_barbeiro=barbeiro.id
    const id_cliente=usuario.id
 const { 
    register, //Pega as informações dos inputs
    handleSubmit, 
    formState: { errors },//Trata os erros dos inputs
  } = useForm({
    resolver: zodResolver(agendamentoSchema)
  });
  const fechar=()=>{
    setFormAgenda(!formAgenda)
  }
  const CadastroAgenda= async (data)=>{
    try{
     await axios.post(`http://localhost:3001/agendamento/${id_barbeiro}/${id_cliente}`,data,{
        headers: {            
            Authorization: `Bearer ${token}` 
        }
    }).then(response=>{
       if(response.data){
          alert("Agendamento realizado com sucesso !!")
          fechar()
       
       }
    })
}catch (error) {
      console.error(error);
      const mensagemErro = error.response?.data?.mensagem || "Erro ao agendar";
      alert(mensagemErro);
      return  alert("Erro em agendar barbeiro",mensagemErro)
    }
        
   
  }
    return(
        <>
         <div className='TituloAgenda'>
           <h1>Agende seu Horário </h1>< IoMdClose className='iconLixo' onClick={fechar}/>
        </div>
    <form  className='formAgenda' onSubmit={handleSubmit(CadastroAgenda)}>
       <input type="datetime-local" {...register("data")}/>
      <button className='botaoAgenda' >AGENDAR</button>
</form>
  </>   
  )
}


function Tela_Barbeiro(){
  const location=useLocation()
  const[cortes,setCortes]=useState([]);
  const[barbeiro,setBarbeiro]=useState();
  const dados=location.state||{}
  const token =localStorage.getItem("token")
  //console.log(dados.dados.id)
  const id_barbeiro=dados.dados?.id;
  const [formAgenda,setFormAgenda]=useState(false)

   const carregandoDadosIniciais=async()=>{
    try {
      const resBar = await axios.get(`http://localhost:3001/barbeiro/${id_barbeiro}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setBarbeiro(resBar.data);
        try {
            const resCorte = await axios.get(`http://localhost:3001/corte/${id_barbeiro}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCortes(resCorte.data);
        }catch (corteError) {
            if (corteError.response?.status === 404) {
                setCortes([]);
            }
        }  
    } catch (error) {
        console.error("Erro ao carregar dados da tela:", error);
    }
   }
   useEffect(() => {
    carregandoDadosIniciais();
 }, [id_barbeiro]);
    return(
        <>
        <Cabecalho usuario={dados.dadosUsuario} dadosCompletos={dados.dados} />
              <div className='cab'>
           
              {formAgenda?(<Agendamento  token={token} usuario={dados.dadosUsuario} barbeiro={barbeiro}  formAgenda={formAgenda} setFormAgenda={setFormAgenda}
              />
              ):(  <MostrarBarbeiroeCortes
              cortes={cortes}  usuario={dados.dadosUsuario} barbeiro={barbeiro} formAgenda={formAgenda} setFormAgenda={setFormAgenda}
              />
            )}
  </div>
        </>
    )
}
 export default Tela_Barbeiro