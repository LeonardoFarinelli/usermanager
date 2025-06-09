import React from "react";
import '@testing-library/jest-dom';  // Import obrigatório para matchers
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";

jest.mock("axios");

describe("Componente App", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({});
    axios.put.mockResolvedValue({});
  });

  it("renderiza os campos do formulário", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Telefone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Criar Usuário/i })).toBeInTheDocument();
  });

  it("envia o formulário e mostra mensagem de sucesso", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Nome"), { target: { value: "João" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "joao@email.com" } });
    fireEvent.change(screen.getByPlaceholderText("Telefone"), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button", { name: /Criar Usuário/i }));

    await waitFor(() => {
      expect(screen.getByText("Usuário criado com sucesso!")).toBeInTheDocument();
    });
  });
});