const Sequelize = require('sequelize');
require('dotenv').config({path: 'variables.env'});

const sequelize = new Sequelize(process.env.DB_MYSQL, process.env.USER_MYSQL, process.env.PASS_MYSQL, {
    host: process.env.HOST_MYSQL,
    dialect: 'mariadb',
});

try {
    sequelize.authenticate();
    console.log('Conexion exitosa a la base de datos');
} catch (error) {
     console.log('Error BD', error);
     process.exit(1);
    
}

module.exports = sequelize;