const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('categories', {
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
    idCuenta:{
        type: Sequelize.NUMBER,
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

module.exports = Category;