const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Zone = require('./Zone');
const User = require('./User');
const Reserver = sequelize.define('reservers', {
    id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idCuenta: {
        type: Sequelize.NUMBER,
        allowNull: false,
       
    }, 
    idCategoria: {
        type: Sequelize.NUMBER,
        allowNull: false,
       
    }, 
    idZone: {
        type: Sequelize.NUMBER,
        allowNull: false,
       
    },
    idUser: {
        type: Sequelize.NUMBER,
        allowNull: false,
       
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    horario: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fechaReserver: {
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
Reserver.belongsTo(Zone, { foreignKey: 'idZone' });
Reserver.belongsTo(User, { foreignKey: 'idUser' });

module.exports = Reserver;