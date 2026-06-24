const mongoose = require('mongoose');

const MONGO_URI =
    process.env.MONGO_URI ??
    'mongodb://root:admin@localhost:27017/anti-social?authSource=admin';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.connectToDatabase = async (retries = MAX_RETRIES) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(MONGO_URI);
            console.log('Conexion con Mongo realizada con exito');
            return;
        } catch (err) {
            console.error(
                `Error conectando a MongoDB (intento ${i + 1}/${retries}): ${err.message}`
            );
            if (i < retries - 1) {
                await sleep(RETRY_DELAY_MS);
            } else {
                console.error(
                    'No se pudo conectar a MongoDB después de varios intentos.'
                );
                process.exit(1);
            }
        }
    }
};

mongoose.connection.on('error', (err) => {
    console.error('Error en la conexión de MongoDB:', err.message);
});
