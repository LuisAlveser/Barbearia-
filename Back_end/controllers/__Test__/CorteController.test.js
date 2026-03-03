import request from 'supertest'
import app from "../../app.js";
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoiTFVJU0BHTUFJTC5DT00iLCJpYXQiOjE3NzE4OTI5MjAsImV4cCI6MTc3MTg5NjUyMH0.UheqWuuSUDmGocdODYX6_YUIHavRVeOSNkjIWSYoiFE'


describe("Teste para Cortes",()=>{
    /*it("Post de Cortes", async ()=>{
        const res=await request(app)
        .post(`/corte/${24}`).send({
            nome: "corte top",
          preco:"50"
        })
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("mensagem")
    })
        */
       it("Excluir Corte com  id errada", async()=>{
        const res=await request(app)
        .delete(`/corte/${24}`)
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("mensagem")
       })

         /* it("Excluir Corte com  id correta", async()=>{
        const res=await request(app)
        .delete(`/corte/${8}`)
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("mensagem")
       })
        */
       it("Get Corte com id correta",async()=>{
        const res=await request(app)
        .get(`/corte/${24}`)
        .auth(token,{type:'bearer'})
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true);
       })

        it("Get Cortes com id errada",async()=>{
        const res=await request(app)
        .get(`/corte/${27}`)
        .auth(token,{type:'bearer'})
        expect(res.status).toBe(404)
       expect(res.body).toHaveProperty("mensagem")
       })

        it("Atualizar Corte com id correta",async()=>{
        const res=await request(app)
        .patch(`/corte/${6}`)
        .send({
            nome:"corte caro",
            preco:"200"
        })
        .auth(token,{type:'bearer'})
        expect(res.status).toBe(200)
       expect(res.body).toHaveProperty("mensagem")
       })
})