import request from 'supertest'
import app from "../../app.js";
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoiTFVJU0BHTUFJTC5DT00iLCJpYXQiOjE3NzE5NDEyODIsImV4cCI6MTc3MTk0NDg4Mn0.wid-Ox-6P56buiamh7NJ3By91Na1aFsjKg0SqnGhTHY'
describe("Testes para Agendamento",()=>{
   
   /* it("Post Agendamento", async()=>{
      const res= await request(app)
      .post("/agendamento")
      .send({
         id_cliente: 25,
        id_barbeiro: 22,
        data: "2026-02-24T13:00:00.000Z",
        cancelamento:false
      })
      .auth(token,{type:'bearer'})
       expect(res.status).toBe(201)
      expect(res.body).toHaveProperty("mensagem")
    })
      */
     it("Buscar Agendamentos por Cliente", async()=>{
        const res=await request(app)
        .get(`/agendamento/cliente/${25}`)
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true);
     })
     it("Buscar Agendamentos por Cliente com id incorreta", async()=>{
        const res=await request(app)
        .get(`/agendamento/cliente/${2}`)
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(404)
         expect(res.body).toHaveProperty("mensagem")
     })
      it("Buscar Agendamentos por Barbeiro", async()=>{
        const res=await request(app)
        .get(`/agendamento/barbeiro/${22}`)
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true);
     })
       it("Buscar Agendamentos por Barbeiro com id incorreta", async()=>{
        const res=await request(app)
        .get(`/agendamento/barbeiro/${2}`)
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(404)
         expect(res.body).toHaveProperty("mensagem")
     })
     it("Cancelar agendamento",async()=>{
        const res= await request(app)
        .patch(`/agendamento/${19}`)
        .auth(token,{type:'bearer'})
        expect(res.status).toBe(200)
        expect (res.body).toHaveProperty("mensagem")
     })
      it("Cancelar agendamento com id incorreta",async()=>{
        const res= await request(app)
        .patch(`/agendamento/${40}`)
        .auth(token,{type:'bearer'})
        expect(res.status).toBe(404)
        expect (res.body).toHaveProperty("mensagem")
     })

})