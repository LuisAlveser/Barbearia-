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
      <header className='cabecalhoTelaBarbeiro'>
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
function MostrarBarbeiroeCortes({token,cortes,setCortes,usuario,barbeiro,setFormAgenda,formAgenda,form,setForm,setuniCorte}){
 //console.log("Dados que chegaram do Barbeiro:", barbeiro);
 //console.log("Dados que dadosCompletos id user :",usuario?.id);
//console.log("Dados de barbeiro id user ", barbeiro?.id_user);

const excluirCorte=async(id)=>{
    try {
        await axios.delete(`http://localhost:3001/corte/${id}`,{
            headers:{
               Authorization: `Bearer ${token}` 
            }
        })
        .then(response=>{
            if(response.data){
                alert("Corte excluido com sucesso")
                setCortes(cortes.filter(p=>p.id!==id))

            }
        })
    } catch (error) {
         alert("Erro em excluir corte",error)
    }
}
const atualizar_Corte=(corte)=>{
    setuniCorte(corte)
    setForm(!form)
}
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
                    <FaPen className='icon' onClick={()=>{atualizar_Corte(corte)}} /> 
                    <FaTrash className='iconLixo' onClick={()=>{excluirCorte(corte.id)}} />
                    
                </div>
                  ):( null

                 )}
            </li>
            ))}
        </ul>
    )}
            <div className='divisor'></div>
            {cortes.length === 0||usuario.regra==="BARBEIRO"? "":
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
      alert("Erro em agendar barbeiro",mensagemErro)
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
 const formSchemaCorte=z.object({
   
   preco: z.coerce.number().min(0.1, "O preço deve ser maior que zero"),
    nome:z.string().min(5,"O nome do corte deve ter mais caracteres")
})
function Formulario({decode, form, setForm, token, uniCorte,cortes,setCortes}){
    
    const { 
    register, //Pega as informações dos inputs
    handleSubmit, 
    reset,
    formState: { errors },//Trata os erros dos inputs
  } = useForm({
    resolver: zodResolver(formSchemaCorte),
    defaultValues: {
      nome: uniCorte?.nome,
      preco: uniCorte?.preco
    }
  });

  
const editarCorte= async (data)=>{
    console.log(data)
   try{
     console.log("ID do corte que será atualizado:", uniCorte.id);
     await axios.patch(`http://localhost:3001/corte/${uniCorte.id}`,data,{
        headers: {            
            Authorization:`Bearer ${token}` 
        }
    })
   .then(response=>{
      if(response.data){
        alert("Corte atualizado  com sucesso");
       
         const listaAtualizada = cortes.map((item) =>
                        item.id === uniCorte.id 
                        ? { ...item, nome: data.nome, preco: data.preco } 
                        : item
                    );
                setCortes(listaAtualizada)
               
        return  setForm(false)
      }
   })
}catch(error){
    return alert("Erro em atualizar corte",error)
   
}

}
    return(
        <>
        <form className='form_barbeiro'onSubmit={handleSubmit(editarCorte)} >
               
            <div className='TituloAgenda' >
           <h1>Atualizar corte</h1>
          
           <IoMdClose className='iconLixo' onClick={() => setForm(false)}/>
            </div>
            <>
              <input className='input' placeholder='Nome' {...register("nome")}  />
              <input className='input' placeholder='Preço' {...register("preco")}  />
            </>
             {errors.nome && <span className="mensagem-erro">{errors.nome.message}</span>}
             {errors.preco && <span className="mensagem-erro">{errors.preco.message}</span>}
            
              <button className='botao_form_barbeiro'>Atualizar</button>
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
 
  const [form,setForm]=useState(false)
  const [uniCorte,setuniCorte]=useState([])
  
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
              ):(form?<Formulario form={form} setForm={setForm} uniCorte={uniCorte} setuniCorte={setuniCorte} token={token}
              cortes={cortes} setCortes={setCortes}/>:
                
            <MostrarBarbeiroeCortes
              cortes={cortes} setCortes={setCortes}  usuario={dados.dadosUsuario} barbeiro={barbeiro} formAgenda={formAgenda} setFormAgenda={setFormAgenda} form={form}
              setForm={setForm} uniCorte={uniCorte} setuniCorte={setuniCorte} token={token}
              />
              )}
  </div>
        </>
    )
}
 export default Tela_Barbeiro