import '../Tela_Principal/Tela_Principal.css'
import { useNavigate,useLocation } from 'react-router-dom';
import Logo from "../assets/Logo.png"
import { jwtDecode } from "jwt-decode";
import { FaRegUserCircle } from "react-icons/fa";
import { useState ,useEffect} from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"
import { IoMdClose } from "react-icons/io";

const formSchema=z.object({
    bio:z.string().min(5,"A biografia deve ter mais caracteres").max(1000),
   
})
 const formSchemaCorte=z.object({
   
   preco: z.coerce.number().min(0.1, "O preço deve ser maior que zero"),
    nome:z.string().min(5,"O nome do corte deve ter mais caracteres")
})



function Formulario({decode,setForm,token,aoSucesso,barbeiros,setBarbeiros}){
    const { 
    register, //Pega as informações dos inputs
    handleSubmit, 
    formState: { errors },//Trata os erros dos inputs
  } = useForm({
    resolver: zodResolver(decode?.regra === "CLIENTE" ? formSchema : formSchemaCorte)
  });
  
  const cadatroBarbeiro= async(data)=>{
    
    const id_user=decode?.id
   if(decode?.regra==="BARBEIRO"){
   return  cadastroCorte(data,id_user);
   }
    await axios.post(`http://localhost:3001/barbeiro/${id_user}`,data,{
        headers: {            
            Authorization: `Bearer ${token}` 
        }
    })
   .then(response=>{
      if(response.data){
       
        alert("Agora você é um Barbeiro!");
        aoSucesso();
        setForm(false)
      }
   }).catch(errors=>{console.log(errors)})
}

const cadastroCorte= async (data,id_user)=>{
   
     await axios.post(`http://localhost:3001/corte/${id_user}`,data,{
        headers: {            
            Authorization: `Bearer ${token}` 
        }
    })
   .then(response=>{
      if(response.data){
       
        alert("Corte criado com sucesso");
        setForm(false)
      }
   }).catch(errors=>{console.log(errors)})

}
    return(
        <>
        <form className='form_barbeiro' onSubmit={handleSubmit(cadatroBarbeiro)}>
           <h1>{decode?.regra === "BARBEIRO" ? "Novo Corte" : "Registre-se"}</h1>
            {decode?.regra==="CLIENTE"?(
            <input className='input'type='text' placeholder='Bio' {...register("bio")}  />
            ):(
            <>
              <input className='input' placeholder='Nome' {...register("nome")}  />
              <input className='input' placeholder='Preço' {...register("preco")}  />
            </>
 
            )}
             {errors.nome && <span className="mensagem-erro">{errors.nome.message}</span>}
             {errors.bio && <span className="mensagem-erro">{errors.bio.message}</span>}
            
              <button className='botao_form_barbeiro'>Cadastrar</button>
         </form>
        </>
    )
}


function Cabecalho ({mudarform,decode,token,agenda,setAgenda
}){
    const abrirAgenda=()=>{
        setAgenda(!agenda)
    }
   const navegation=useNavigate();
    const sair=()=>{
        console.log(token)
        localStorage.clear()
        navegation("/")
    }
    return(
    <>
      <header className='cabecalho'>
         <div className='logoItens'>
            <img src={Logo} className='Logocab' />
            <h1 className='NomeSite'>CORTE JÁ</h1>
         </div>
        <div className='usuarioOpcao'>
          <FaRegUserCircle className='iconUser'/>
          <h2 className='NomeSite'>{decode.nome}</h2>
          <h3 className='regraUsuario'>{decode.regra}</h3>
          <button className='botaotelaPrincipal' onClick={mudarform}>
            { decode.regra==="BARBEIRO"?"CADASTRE CORTES":"TRABALHE AQUI"}
          </button>
         
           <button className='botaotela' onClick={abrirAgenda} >Agenda</button>
          <button className='botaotela' onClick={sair} >Sair</button>
        
         
        </div>
    </header>
</>
    )
}

function MostrarBarbeiros({barbeiros, dadosUsuario}){
     const navegation=useNavigate();
    const verBarbeiro=(barbeiro,dadosUsuario)=>{
        navegation("/Tela_Barbeiro", { state:{ dados: barbeiro,dadosUsuario}})
    }
    return(
    <>
      <div className='lista'>
      <ul className='listaBarbeiros'>
        {barbeiros.map((barbeiro)=>(
            <li key={barbeiro.id} className='barbeiro'> 
             <div className='conteudo'>
                <div className='usuario_img'>
                <h1 className='textoBarbeiro'> <FaRegUserCircle className='iconBarbeiroTelaPrincipal'/>{barbeiro.Usuario.nome} </h1>
             </div>
                <h1 className='textoBarbeiro'>Bio: {barbeiro.bio} </h1>
                <button className='botaotelaVerBarbeiro' onClick={()=>{verBarbeiro(barbeiro,dadosUsuario)}} >Ver Barbeiro</button>
           </div> 
        </li>
        ))}
      </ul>
 </div>
</>)
}
function MostrarAgenda({agenda,setAgenda,token,decode,horarios,sethorarios}){
    console.log(decode.regra)
 const mostarhorarios= async()=>{
        const rota =decode.regra==="CLIENTE"? "cliente" : "barbeiro"
            try{
            await axios.get(`http://localhost:3001/agendamento/${rota}/${decode.id}`,{
        headers: {            
            Authorization: `Bearer ${token}` 

        }}).then(response=>{
            if(response.data && response.data.length > 0){
              return  sethorarios(response.data)
            }})
    }catch(error){
        if (error.response && error.response.status === 404) {
      sethorarios([]); 
    } else {
      console.error("Erro real de servidor:", error);
      alert("Erro ao carregar agenda.");
    }
    }
   
    
}
const cancelarhorario=async(id)=>{
   
    try {
          await axios.patch(`http://localhost:3001/agendamento/${id}`,{},{
        headers: {            
            Authorization: `Bearer ${token}` 

        }}).then(response=>{
            if(response.data){
              
                sethorarios(horarios.map(h=>h.id===id?{...h,cancelamento:true}:h))
                 return  alert("Cancelamneto realizado com sucesso")
            }
    })}
     catch (error) {
     return   alert("Erro em cancelar  horário",error)
    }
}
 useEffect(() => {
     mostarhorarios(); 
    }, [decode.id]);
 const fechar=()=>{
    setAgenda(!agenda)
 }
 const tratarhorario=(horario)=>{
    const [data,hora]=horario.split(" ")
    const [ano,mes,dia]=data.split("-")
    const datafromatada=`${dia}/${mes}/${ano}  ${hora}`
    return datafromatada
 }
     return(
       <>
      <div className='Agenda'>
          <div className='Titulo'>
          <h1 className='texto_agenda'>Agenda de Horários</h1>
          < IoMdClose className='iconLixo' onClick={fechar}/>
          </div>
        <ul>
       {
        horarios.length > 0?(
       horarios&& horarios.map((horario)=>(
         
          <li key={horario.id} className='conteudo_lista_agenda' >
            <h2 className='texto_agenda'>Cliente: {horario.Usuario.nome} </h2>
             <h2 className='texto_agenda'>Horário: {tratarhorario(horario.data)}</h2>
             
             {
                horario.cancelamento===true?(<p className='texto_cancelado'>HORÁRIO CANCELADO</p>):(
             <button className='botao_cancelamento' onClick={()=>{cancelarhorario(horario.id)}}>CANCELAR </button>
                )
                
            }
          </li>
        ))
    ):(
      <h1 >Nenhum horário agendado.</h1>
    )}
     </ul>
   </div> 
    </>)
}

function Tela_Principal (){
    const [formulario,setForm]=useState(false)
     const [agenda,setAgenda]=useState(false)

     const mudarform=()=>{
        setForm(!formulario)
     }
     const [horarios,sethorarios]=useState([])
      const [barbeiros,setBarbeiros]=useState([])
     const location =  useLocation();
     const dados=location.state||{}
     const token=dados.dados?.token
     const [dadosUsuario, setDadosUsuario] = useState(() => {
     return token ? jwtDecode(token) : null;
  });
  //console.log(dadosUsuario)
  const carregarBarbeiros=()=>{
     try{
     axios.get("http://localhost:3001/barbeiro/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response =>{
        if(response.data){
        setBarbeiros(response.data)   
    }})
} catch(error){
     console.log("Erro ao buscar barbeiros",error);
}
    
}
     useEffect(() => { carregarBarbeiros(); }, [dadosUsuario]);

     const decode=jwtDecode(dados.dados.token)
    return(
      <>
       <Cabecalho formulario={formulario} mudarform={mudarform} decode={dadosUsuario} token={token} agenda={agenda}
       setAgenda={setAgenda}
       />
        <div className='cab'>
         {formulario ?<Formulario  user={decode} setForm={setForm} decode={decode} 
         token={token} aoSucesso={()=>setDadosUsuario({...dadosUsuario,regra:"BARBEIRO"})}/>:null
         }
        { agenda?<MostrarAgenda agenda={agenda}   setAgenda={setAgenda} token={token} decode={dadosUsuario} 
         horarios={horarios} sethorarios={sethorarios}/>
        :<MostrarBarbeiros  barbeiros={barbeiros} dadosUsuario={dadosUsuario}/>
        }
  </div>
</>
    
)
}
export default  Tela_Principal