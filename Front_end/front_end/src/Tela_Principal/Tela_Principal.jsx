import '../Tela_Principal/Tela_Principal.css'
import { useNavigate,useLocation ,useNavigation} from 'react-router-dom';
import Logo from "../assets/Logo.png"
import { jwtDecode } from "jwt-decode";
import { FaRegUserCircle } from "react-icons/fa";
import { useState ,useEffect} from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"


const formSchema=z.object({
    bio:z.string().min(5,"A biografia deve ter mais caracteres"),
    nome:z.string().min(5,"O nome do corte deve ter mais caracteres")
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
            <input className='input' placeholder='Bio' {...register("bio")}  />
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


function Cabecalho ({mudarform,decode,token}){
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
         
          
          <button className='botaotelaPrincipal' onClick={sair} >Sair</button>
        
         
        </div>
    </header>
</>
    )
}
function MostrarBarbeiros({barbeiros}){
    return(
    <>
      <div className='lista'>
      <ul className='listaBarbeiros'>
        {barbeiros.map((barbeiro)=>(
            <li key={barbeiro.id} className='barbeiro'> 
             <div className='conteudo'>
                <div className='usuario_img'>
                <h1 className='textoBarbeiro'> <FaRegUserCircle className='iconBarbeiro'/>{barbeiro.Usuario.nome} </h1>
             </div>
                <h1 className='textoBarbeiro'>Bio: {barbeiro.bio} </h1>
                <button className='botaotelaPrincipal' >Ver Barbeiro</button>
           </div> 
        </li>
        ))}
      </ul>
 </div>
</>)
}


function Tela_Principal (){
    const [formulario,setForm]=useState(false)
     const mudarform=()=>{
        setForm(!formulario)
     }
      const [barbeiros,setBarbeiros]=useState([])
     const location =  useLocation();
     const dados=location.state||{}
     const token=dados.dados?.token
     const [dadosUsuario, setDadosUsuario] = useState(() => {
     return token ? jwtDecode(token) : null;
  });
  const carregarBarbeiros=()=>{
     axios.get("http://localhost:3001/barbeiro/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response =>{
        if(response.data){
        setBarbeiros(response.data)   
    }}).catch(() => console.log("Erro ao buscar barbeiros"));
}
     useEffect(() => { carregarBarbeiros(); }, [dadosUsuario]);

     const decode=jwtDecode(dados.dados.token)
    return(
      <>
       <Cabecalho formulario={formulario} mudarform={mudarform} decode={dadosUsuario} token={token}/>
        <div className='cab'>
         {formulario ?<Formulario  user={decode} setForm={setForm} decode={decode} 
         token={token} aoSucesso={()=>setDadosUsuario({...dadosUsuario,regra:"BARBEIRO"})}/>:null
         }
         <MostrarBarbeiros  barbeiros={barbeiros} />
  </div>
</>
    
)
}
export default  Tela_Principal