import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  // Buscar usuários
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUserId) {
        // Editar usuário existente
        await axios.put(`http://localhost:5000/api/users/${editUserId}`, formData);
        setMessage("Usuário atualizado com sucesso!");
      } else {
        // Criar usuário novo
        await axios.post("http://localhost:5000/api/users", formData);
        setMessage("Usuário criado com sucesso!");
      }
      setFormData({ name: "", email: "", phone: "" });
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      setMessage("Erro ao salvar usuário.");
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone });
    setEditUserId(user._id);
    setMessage("");
  };

  const handleCancelEdit = () => {
    setFormData({ name: "", email: "", phone: "" });
    setEditUserId(null);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setMessage("Usuário deletado com sucesso!");
        if (editUserId === id) {
          handleCancelEdit();
        }
        fetchUsers();
      } catch (err) {
        setMessage("Erro ao deletar usuário.");
        console.error(err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciador de Usuários</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={styles.button}>
            {editUserId ? "Salvar alterações" : "Criar Usuário"}
          </button>
          {editUserId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{ ...styles.button, backgroundColor: "#6c757d" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      <h2 style={{ marginTop: 40 }}>Usuários cadastrados</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Telefone</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{ ...styles.actionButton, backgroundColor: "#ffc107" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{ ...styles.actionButton, backgroundColor: "#dc3545" }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.td}>
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 20,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: 12,
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    marginTop: 20,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  th: {
    borderBottom: "2px solid #007BFF",
    padding: 10,
    textAlign: "left",
    color: "#007BFF",
  },
  td: {
    padding: 10,
    borderBottom: "1px solid #ddd",
  },
  actionButton: {
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 12px",
    marginRight: 8,
    cursor: "pointer",
    fontSize: 14,
  },
};