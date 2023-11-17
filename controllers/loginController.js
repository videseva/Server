const { json } = require("express/lib/response");
const { Op } = require("sequelize");
const User = require("../models/User");
const { use } = require("../routes/api");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});


exports.loginUser = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        console.log(correo, contrasena);
        const user = await User.findOne({
            where: {
                correo: correo,
                contrasena: contrasena
            },
        });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrada' });
        }
        const token = jwt.sign({ 
            id: user.id,
            idCuenta: user.idCuenta,
            tipoUser: user.tipoUser
        }, process.env.SECRET_KEY);
        console.log(token);

        const r = {
            'user': {
                'id': user.id,
                'idCuenta': user.idCuenta,
                'nombre': user.nombre,
                'tipoUser': user.tipoUser,
            },
            'token': {token}
        };
        res.status(200).send(r);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}