const express = require('express');
const professorController = require('../controller/professorController');
const router = express.Router();

router.get('/professores', professorController.findAll);
router.get('/professores/:id', professorController.findById);
router.get('/professores/:id/turmas', professorController.findTurmasByProfessorId);
router.put('/professores/:id', professorController.updateProfessor);
router.post('/professores/:id/turmas', professorController.insertTurma);
router.get('/professores/departamento/:departamento', professorController.findAllByDepartamentos);
router.delete('/professores/:id', professorController.deleteById);

module.exports = router;
