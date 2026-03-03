import request from 'supertest'
import app from "../../app.js";

describe("Testes para Usuário",()=>{
    it("Cadastro usuario",async ()=>{
        const res= await request(app)
        .post("/usuario")
        .send({
            nome:"dsodijf",
            email:"teste@gmail.com",
            senha:"2377464"
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("token")
    })
    it("Atualizar usuario",async ()=>{
        const res= await request(app)
        .patch(`/usuario/${6}`)
        .send({
            nome:"dsatualizado",
            email:"teste@gmail.com",
            senha:"2377464"
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("mensagem")
    })
      it("Atualizar com id incorreta usuario",async ()=>{
        const res= await request(app)
        .patch(`/usuario/${10}`)
        .send({
            nome:"dsodijf",
            email:"teste@gmail.com",
            senha:"2377464"
        })
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("mensagem")
    })
        it("Excluir  com id incorreta usuario",async ()=>{
        const res= await request(app)
        .delete(`/usuario/${10}`)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("mensagem")
    })
     /*it("Excluir  com id correta usuario",async ()=>{
        const res= await request(app)
        .delete(`/usuario/${12}`)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("mensagem")
    })
        */
    it("Login Usuario correto ", async()=>{
       const res=await request(app)
       .post("/usuario/login")
       .send({
        email:"Luis14@gmail.com",
        senha:"12345"
    })

       expect(res.body).toHaveProperty("token")
       expect(res.status).toBe(200)
    })
     it("Login Usuario incorreto ", async()=>{
       const res=await request(app)
       .post("/usuario/login")
       .send({
        email:"Luis14@gmail.com",
        senha:"123455"
    })

       expect(res.body).toHaveProperty("mensagem")
       expect(res.status).toBe(404)
    })
})





