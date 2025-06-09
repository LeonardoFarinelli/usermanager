require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe("Testes da API de usuários", () => {
  let userId;

  it("Deve listar usuários (GET /api/users)", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve criar um usuário (POST /api/users)", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Teste", email: "teste@email.com", phone: "123456" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    userId = res.body._id; // salva pra usar depois
  });

  it("Deve editar um usuário (PUT /api/users/:id)", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: "Teste Editado", email: "editado@email.com", phone: "654321" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Teste Editado");
  });

  it("Deve deletar um usuário (DELETE /api/users/:id)", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
