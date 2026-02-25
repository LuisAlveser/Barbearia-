import '../Tela_Principal/Tela_Principal.css'
import { useNavigate,useLocation } from 'react-router-dom';
import Logo from "../assets/Logo.png"
import { jwtDecode } from "jwt-decode";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"


const formSchema=z.object({
    bio:z.string().min(5,"A biografia deve ter mais caracteres")
})
 



function Formulario({decode,setForm,token,aoSucesso}){
    const { 
    register, //Pega as informações dos inputs
    handleSubmit, 
    formState: { errors },//Trata os erros dos inputs
  } = useForm({
    resolver: zodResolver(formSchema)
  });
  
  const cadatroBarbeiro= async(data)=>{
    const id_user=decode?.id
    console.log(id_user)
  
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
    return(
        <>
         <form className='form_barbeiro' onSubmit={handleSubmit(cadatroBarbeiro)}>
            <h1>Resgistre-se como Barbeiro</h1>
            <input className='input' placeholder='Bio' {...register("bio")}  />
             {errors.bio && <span className="mensagem-erro">{errors.bio.message}</span>}
              <button className='botao_form_barbeiro'>Cadastrar</button>
         </form>
        </>
    )
}


function Cabecalho ({formulario,mudarform,decode}){
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
          {
            decode.regra==="BARBEIRO"? <button className='botaotelaPrincipal'>CADASTRE CORTES</button>
            :<button className='botaotelaPrincipal' onClick={mudarform}>TRABALHE AQUI</button>
          }
        
         
        </div>
    </header>
</>
    )
}
function MostrarBarbeiros(){
    const [barbeiros,setBarbeiros]=useState([])
    const mustrarBarbeiros=()=>{
        axios.get("`http://localhost:3001/barbeiro")
    }
    return(
    <>
    
</>)
}
function Tela_Principal (){
    const [formulario,setForm]=useState(false)
     const mudarform=()=>{
        setForm(!formulario)
     }
     const location =  useLocation();
     const dados=location.state||{}

     const [dadosUsuario, setDadosUsuario] = useState(() => {
     return dados.dados.token ? jwtDecode(token) : null;
  });
     const decode=jwtDecode(dados.dados.token)
    return(
      <>
       <Cabecalho formulario={formulario} mudarform={mudarform} decode={decode}/>
        <div className='cab'>
         {formulario ?<Formulario  user={decode} setForm={setForm} decode={decode} 
         token={dados.dados.token} aoSucesso={()=>setDadosUsuario({...dadosUsuario,regra:"BABEIRO"})}/>:null}
  </div>
</>
    
)
}
export default  Tela_Principal