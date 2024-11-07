const mongoose = require("mongoose");

const disciplinaSchema = new mongoose.Schema({
    codigo: String,
    disciplina: String,
    alunos: [String]
});

const professorSchema = new mongoose.Schema({
    id: String,
    nome: String,
    idade: Number,
    departamento: String,
    turmas: [disciplinaSchema]
});

const Professor = mongoose.model("Professor", professorSchema);
module.exports = Professor;
