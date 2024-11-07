const mongoose = require('mongoose');

const conectar = async () => {
    try {
        await mongoose.connect('mongodb://root:admin@localhost:27017/db_professor?authSource=admin');
        console.log("Conectado ao MongoDB");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    }

    return mongoose.connection;
}

module.exports = { conectar };
