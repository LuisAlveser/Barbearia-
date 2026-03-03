import request from 'supertest'
import app from "../../app.js";
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoiTFVJU0BHTUFJTC5DT00iLCJpYXQiOjE3NzE4ODg3NjYsImV4cCI6MTc3MTg5MjM2Nn0.kegXkOpQqqreMOJVT2FxKgrBOdnl0nuhF2Kno4RAIQo'
describe("Teste para Barbeiro",()=>{
    /*it("Post Barbeiro", async()=>{
        res=await request(app)
        .post(`/barbeiro/${17}`)
        .send({
         
            bio:"Barbeiro top"

        })
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("mensagem")
    })
    */
      it("Get Barbeiros", async()=>{
        res=await request(app)
        .get(`/barbeiro`)
        
        .auth(token, { type: 'bearer' });
        expect(res.status).toBe(200)
         expect(res.body).toBeInstanceOf(Array); 
    })
       it("Get Barbeiro", async()=>{
        res=await request(app)
        .get(`/barbeiro/${7}`)
        
        .auth(token, { type: 'bearer' });
          expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object);
    })
       it("Get Barbeiro com id errado", async()=>{
        res=await request(app)
        .get(`/barbeiro/${17}`)
        
        .auth(token, { type: 'bearer' });
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty("mensagem")
     
    })
       it("Atualizar  Barbeiro", async()=>{
        res=await request(app)
        .patch(`/barbeiro/${17}`)
        .send({
            bio:"Bio atualizada"
        })
        .auth(token, { type: 'bearer' });
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty("mensagem")
     
    })
    it("Atualizar  Barbeiro com id errado", async()=>{
        res=await request(app)
        .patch(`/barbeiro/${70}`)
        .send({
            bio:"Bio atualizada"
        })
        .auth(token, { type: 'bearer' });
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty("mensagem")
     
    })

})