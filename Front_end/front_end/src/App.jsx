import { useState } from 'react'
import Logo from "../src/assets/Logo.png"
import './App.css'
import axios from "axios"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
const cadastroSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Insira um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const loginSchema = z.object({

  email: z.string().email("Insira um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});


function Formulario(){
  const [carregando,setCarregando]=useState(false)
  const [logado,setLogado]=useState(false)


 const { 
    register, //Pega as informações dos inputs
    handleSubmit, 
    formState: { errors },//Trata os erros dos inputs
  } = useForm({
    resolver: zodResolver(logado ? loginSchema : cadastroSchema)
  });



const alterarStatus =(e)=>{ 
     e.preventDefault();
     setLogado(!logado)
}
const Cadastro= async (data)=>{
 
  setCarregando(true)
   const endpoint = logado ?'http://localhost:3001/usuario/login' : 'http://localhost:3001/usuario';
  await axios.post(endpoint,data)
   .then(response=>{
    if(response.data){
      setCarregando(false)
      localStorage.setItem("token",response.data.token)
       console.log("Cadastro e login realizados!");
    } else {
       setCarregando(false)
        console.log("Usuário cadastrado com sucesso (sem token).");
      }
    
  })
   .catch(error => {
        setCarregando(false)
        console.error("Erro na requisição:", error.response?.data || error.message);
      });

}
   
  return(
    <>
    <div className='Formulario'>
      <form className="form" onSubmit={handleSubmit(Cadastro)}>
         <h1 className='texto_form'>{logado?"Login":"Cadastre-se"}</h1>
         {logado?"" 
         :<input type="text" placeholder='Nome' className='input' {...register("nome")}/>
        
        }
          {errors.nome && <span className="mensagem-erro">{errors.nome.message}</span>}
        
         <input type="email" placeholder='Email' className='input' {...register("email")}/>
         {errors.email && <span className="mensagem-erro">{errors.email.message}</span>}

          <input type="password" placeholder='Senha' className='input'  {...register("senha")}/>
           {errors.senha && <span className="mensagem-erro">{errors.senha.message}</span>}
          
          <button className='botao' >
            { carregando? <FaSpinner className="spinner" />:logado?"ENTRAR":"CADASTRAR"}
          </button>

          {logado?
          <h4>Não tem conta? <a className='a' onClick={alterarStatus}>Clique aqui!!</a></h4>
          :<h4>Já tem conta ? <a className='a' onClick={alterarStatus}>Clique aqui!!</a></h4>
        }
      </form>
    </div>
    </>
  )
}


function App() {
  return (
    <>
     <div className='Fundo'>
      <img src={Logo} className='Logo' />
      <Formulario/>
     </div>
    </>
  )
}

export default App
