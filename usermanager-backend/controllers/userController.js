const User = require('../models/user');

// Criar usuário
exports.createUser = async (req, res) => {
  try {
    console.log('Recebido no createUser:', req.body); // <-- Adicione isso
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Erro ao criar usuário:', err.message); // <-- Também no console
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};