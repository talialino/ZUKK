/**
 * @jest-environment ./src/models/prisma/prisma-environment-jest
 */
const request = require('supertest');
const app = require('../server');

let id = '';
const body = {
    cpf_cnpj: "00776574080156",
    nome_produtor: "Produtor1",
    nome_fazenda: "Fazenda1",
    cidade: "Cidade1",
    estado: "Estado1",
    area_total_fazenda: 20000,
    area_agricultavel: 400,
    area_vegetacao: 300,
    culturas: ["Milho", "Soja"]
    }

describe('método create', () => {
  it('Criação de um novo produtor com sucesso', async () => {
    const response = await request(app)
      .post('/criarProdutor')
      .send(body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
  });

  it('Erro ao tentar salvar produtor que já existe', async () => {

    const response = await request(app)
    .post('/criarProdutor')
    .send(body);
        expect(response.status).toBe(409);
    });

});

describe('método read', () => {
    it('Sucesso ao listar produtores', async () => {  
      const response = await request(app)
        .get('/listarProdutores')

        expect(response.status).toBe(201);
    });
  
});

describe('método update', () => {
    it('Sucesso quando atualizar os dados de um produtor', async () => { 
        const response = await request(app)
        .put('/atualizarProdutores')
        .send(body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');

    });
  
});

describe('método delete', () => {
    it('Sucesso deletar os dados de um produtor', async () => { 
        const response = await request(app)
        .delete(`/deletarProdutores/${id}`); 

        expect(response.status).toBe(200);
    });

    it('Erro ao deletar os dados de um produtor sem passar o id', async () => { 
        const response = await request(app)
        .delete("/deletarProdutores/id"); 

        expect(response.status).toBe(409);
    });
  
});

describe('método dashboard', () => {
  it('Sucesso ao listar dashboard', async () => {  
    const response = await request(app)
      .get('/listarDashboard')

      expect(response.status).toBe(200);
  });

});
