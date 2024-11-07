const mongoConfig = require('../config/mongoConfig');
const db = mongoConfig.conectar();

async function findAll(req, res) {
    try {
        const collection = (await db).collection("professores");
        const professores = await collection.find().toArray();

        res.status(200).json(professores);
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        res.status(500).json({ error: "Erro ao buscar professores" });
    }
}

async function findAllByDepartamentos(req, res) {
    try {
        const departamento = req.params.departamento;
        const collection = (await db).collection("professores");
        const professores = await collection.find({ 'departamento': departamento }).toArray();

        res.status(200).json(professores);
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        res.status(500).json({ error: "Erro ao buscar professores" });
    }
}

async function findById(req, res) {
    try {
        const professorId = req.params.id;
        const collection = (await db).collection("professores");

        const professor = await collection.findOne({ 'id': professorId });

        res.status(200).json(professor);
    } catch (error) {
        console.error("Erro ao buscar professor:", error);
        res.status(500).json({ error: "Erro ao buscar professor" });
    }
}

async function deleteById(req, res) {
    try {
        const professorId = req.params.id;
        const collection = (await db).collection("professores");

        await collection.deleteOne({ 'id': professorId });

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao buscar professor:", error);
        res.status(500).json({ error: "Erro ao buscar professor" });
    }
}

async function updateProfessor(req, res) {
    try {
        const professorId = req.params.id;
        const newProfessor = req.body;
        const collection = (await db).collection("professores");

        const oldProfessor = await collection.findOne({ 'id': professorId });

        if (oldProfessor) {
            await collection.updateOne(
                { 'id': professorId },
                { $set: {
                    'nome': newProfessor.nome,
                    'idade': newProfessor.idade,
                    'departamento': newProfessor.departamento
                } }
            );

            res.status(200).send();
        } else {
            res.status(404).json({ error: "Id não existente" });
        }
    } catch (error) {
        console.error("Erro ao atualizar o professor:", error);
        res.status(500).json({ error: "Erro ao atualizar o professor" });
    }
}

async function findTurmasByProfessorId(req, res) {
    try {
        const professorId = req.params.id;
        const collection = (await db).collection("professores");

        const professor = await collection.findOne({ 'id': professorId });

        if (professor) {
            res.status(200).json(professor.turmas);
        } else {
            res.status(404).json({ error: "Professor não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        res.status(500).json({ error: "Erro ao buscar turmas" });
    }
}

async function insertTurma(req, res) {
    try {
        const professorId = req.params.id;
        const turma = req.body;
        const collection = (await db).collection("professores");

        const professor = await collection.findOne({ 'id': professorId });

        if (professor) {
            professor.turmas.push(turma);

            await collection.updateOne(
                { 'id': professorId },
                { $set: professor}
            );

            res.status(204).send();
        } else {
            res.status(404).json({ error: "Id não existente" });
        }
    } catch (error) {
        console.error("Erro ao atualizar o professor:", error);
        res.status(500).json({ error: "Erro ao atualizar o professor" });
    }
}

module.exports = { findAll, findById, findTurmasByProfessorId, updateProfessor, insertTurma, findAllByDepartamentos, deleteById };
