import { useNavigate,useLocation } from 'react-router-dom';
import Logo from "../assets/Logo.png"
import { FaRegUserCircle } from "react-icons/fa";
import { useState ,useEffect} from 'react';
import axios from "axios";
import '../Tela_Barbeiro/Tela_Barbeiro.css'




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
function MostrarBarbeiroeCortes({cortes,dadosCompletos,barbeiro}){
 console.log("Dados que chegaram do Barbeiro:", barbeiro);

  if (!barbeiro) {
    return <h1 className='text'>Carregando dados...</h1>;
  }
  

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
                </li>
            ))}
        </ul>
    )}
            <div className='divisor'></div>
           <button className='botaoAgenda'>Agendar Horário</button>
         </div>
         
         
       
     </>

 )

}


function Tela_Barbeiro(){
  const location=useLocation()
  const[cortes,setCortes]=useState([]);
  const[barbeiro,setBarbeiro]=useState();
  const dados=location.state||{}
  const token =localStorage.getItem("token")
  console.log(dados.dados.id)
  const id_barbeiro=dados.dados.id;

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
             <MostrarBarbeiroeCortes
              cortes={cortes}  dadosCompletos={dados.dados} barbeiro={barbeiro} 
              />
  </div>
        </>
    )
}
 export default Tela_Barbeiro