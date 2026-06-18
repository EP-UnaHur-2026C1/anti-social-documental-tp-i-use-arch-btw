const mongoose = require('mongoose');

const MONGO_URI =
    process.env.MONGO_URI ??
    'mongodb://root:admin@localhost:27017/anti-social?authSource=admin';

let isConnected;

exports.connectToDatabase = async () => {
    if (!isConnected) {
        await mongoose.connect(MONGO_URI);
        console.log('Conexion con Mongo realizada con exito');
        isConnected = true;
    }
};
