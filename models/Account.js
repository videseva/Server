const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Account = sequelize.define('accounts', {
    id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefono: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    direccion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
        get() {
            if (typeof this.getDataValue('date') == 'string') {
                return this.getDataValue('date').slice(0, 10).replace('T', ' ');
            }
        }
    },
}, {

    timestamps: false,
});

module.exports = Account;