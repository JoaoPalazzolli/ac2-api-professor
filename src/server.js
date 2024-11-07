const express = require('express');
const routes = require('./routes/professorRoutes');
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
