const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Zone = sequelize.define('Zones', {
    id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        
    },idCuenta: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    capacidad: {
        type: Sequelize.NUMBER,
        allowNull: false,
    }, 
    idCategoria: {
        type: Sequelize.NUMBER,
        allowNull: false,
    }, 
    foto: {
        type: Sequelize.STRING,
        allowNull: true,
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

module.exports = Zone;